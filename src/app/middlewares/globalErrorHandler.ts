import appError from "@shared/appError";
import httpStatus from "@shared/httpStatus";
import type { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
	// Default error response
	let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
	let message = "Something went wrong!";

	// Handle custom AppError
	if (err instanceof appError) {
		statusCode = err.statusCode;
		message = err.message;
	}
	// Handle different types of errors
	else if (err.statusCode) {
		statusCode = err.statusCode;
		message = err.message;
	} else if (err.message) {
		message = err.message;
	}

	// Handle Prisma errors
	if (err.code === "P2002") {
		statusCode = httpStatus.CONFLICT;
		message = "Duplicate entry found";
	} else if (err.code === "P2025") {
		statusCode = httpStatus.NOT_FOUND;
		message = "Record not found";
	} else if (err.code?.startsWith("P")) {
		statusCode = httpStatus.BAD_REQUEST;
		message = "Database operation failed";
	}

	// Handle Zod validation errors
	if (err.name === "ZodError") {
		statusCode = httpStatus.BAD_REQUEST;
		message = "Validation failed";
	}

	// Standardized error response structure
	const errorResponse: {
		success: boolean;
		status: number;
		message: string;
		stack?: string;
	} = {
		success: false,
		status: statusCode,
		message,
	};

	// Include stack trace only in development
	if (process.env["NODE_ENV"] === "development") {
		errorResponse.stack = err.stack;
	}

	res.status(statusCode).json(errorResponse);
};

export default globalErrorHandler;
