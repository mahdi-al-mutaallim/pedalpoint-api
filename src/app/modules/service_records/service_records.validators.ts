import { ServiceStatus } from "@generated/prisma";
import z from "zod";

const createServiceRecordValidationSchema = z.object({
	body: z.object({
		bikeId: z.string().uuid(),
		serviceDate: z.string().datetime(),
		description: z.string().min(1).max(500),
		status: z.nativeEnum(ServiceStatus),
	}),
});

const serviceRecordIdParamsValidationSchema = z.object({
	params: z.object({
		id: z.string().uuid(),
	}),
});

const updateServiceRecordByIdValidationSchema = z.object({
	params: z.object({
		id: z.string().uuid(),
	}),
	body: z
		.object({
			completionDate: z.string().datetime()
		})
		.optional(),
});

export const ServiceRecordsValidators = {
	createServiceRecordValidationSchema,
	serviceRecordIdParamsValidationSchema,
	updateServiceRecordByIdValidationSchema,
};
