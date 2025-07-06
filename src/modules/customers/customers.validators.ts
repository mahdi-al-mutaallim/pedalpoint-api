import z from "zod";

const createCustomerValidationSchema = z.object({
	body: z.object({
		name: z.string().min(2).max(100),
		email: z.string().email(),
		phone: z.string().min(10).max(15),
	}),
});

const customerIdParamsValidationSchema = z.object({
	params: z.object({
		id: z.string().uuid(),
	}),
});

const updateCustomerByIdValidationSchema = z.object({
	params: z.object({
		id: z.string().uuid(),
	}),
	body: z.object({
		name: z.string().min(2).max(100).optional(),
		email: z.string().email().optional(),
		phone: z.string().min(10).max(15).optional(),
	}),
});

export const CustomersValidators = {
	createCustomerValidationSchema,
	customerIdParamsValidationSchema,
	updateCustomerByIdValidationSchema,
};
