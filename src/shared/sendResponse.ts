import type { Response } from "express";

const sendResponse = <T>(
	res: Response,
	data: {
		code: number;
		success: boolean;
		message: string;
		meta?: {
			page: number;
			limit: number;
			total: number;
		};
		data?: T | null | undefined;
	},
) => {
	res.status(data.code).json({
		success: data.success,
		message: data.message,
		meta: data.meta || null || undefined,
		data: data.data || null || undefined,
	});
};

export default sendResponse;
