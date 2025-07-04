import z from "zod";

const createBikeValidationSchema = z.object({
	body: z.object({
		brand: z.string().min(2).max(100),
		model: z.string().min(2).max(100),
		year: z.number().min(1900).max(new Date().getFullYear()),
		customerId: z.string().uuid(),
	}),
});

const bikeIdParamsValidationSchema = z.object({
	params: z.object({
		id: z.string().uuid(),
	}),
});

export const BikesValidators = {
	createBikeValidationSchema,
	bikeIdParamsValidationSchema,
};
