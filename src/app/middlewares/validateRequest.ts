import type { RequestHandler } from "express";
import type { AnyZodObject } from "zod";

const validateRequest = (schema: AnyZodObject): RequestHandler => {
	return async (req, _res, next) => {
		try {
			await schema.parseAsync({ body: req.body });
			return next();
		} catch (error) {
			return next(error);
		}
	};
};

export default validateRequest;
