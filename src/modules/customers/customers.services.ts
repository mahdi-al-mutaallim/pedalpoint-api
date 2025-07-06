import { prisma } from "../../shared/prisma.js";
import type { TCustomer } from "./customers.types.js";

const getCustomersFromDB = async () => {
	return await prisma.customer.findMany();
};

const getCustomerByIdFromDB = async (id: string) => {
	return await prisma.customer.findUniqueOrThrow({ where: { customerId: id } });
};

const createCustomerIntoDB = async (payload: TCustomer) => {
	return await prisma.customer.create({ data: payload });
};

const updateCustomerByIdIntoDB = async (
	id: string,
	data: Partial<TCustomer>,
) => {
	const customer = await prisma.customer.findUnique({
		where: { customerId: id },
	});

	if (!customer) {
		return null;
	}

	return await prisma.customer.update({
		where: { customerId: id },
		data,
	});
};

const deleteCustomerByIdFromDB = async (id: string) => {
	return await prisma.customer.delete({ where: { customerId: id } });
};

export const CustomersServices = {
	getCustomersFromDB,
	getCustomerByIdFromDB,
	createCustomerIntoDB,
	updateCustomerByIdIntoDB,
	deleteCustomerByIdFromDB,
};
