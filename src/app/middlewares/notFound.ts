import httpStatus from "@shared/httpStatus";
import type {  RequestHandler } from "express";

const notFound: RequestHandler = (req, res, _next) => {
	res.status(httpStatus.NOT_FOUND).json({
		status: "error",
		message: "API Route not found",
		error: {
			path: req.originalUrl,
			message: "Your requested path does not exists",
		},
	});
};

export default notFound;
