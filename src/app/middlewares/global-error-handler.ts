import httpStatus from "@shared/http-status";
import type { ErrorRequestHandler } from "express";

const global_error_handler: ErrorRequestHandler = (err, _req, res, _next) => {
	res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
		status: "error",
		message: err.message || "Something went wrong!",
		error: err,
	});
};

export default global_error_handler;
