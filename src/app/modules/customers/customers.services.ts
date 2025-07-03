import prisma from "@shared/prisma";

const getCustomersFromDB = async () => {
  return await prisma.customer.findMany();
};

const createCustomersIntoDB = async () => {
  // Example: return await prisma.customer.create({ data: {...} });
};

const updateCustomersIntoDB = async () => {
  // Example: return await prisma.customer.update({ where: {...}, data: {...} });
};

const deleteCustomersFromDB = async () => {
  // Example: return await prisma.customer.delete({ where: {...} });
};

export const CustomersServices = {
  getCustomersFromDB,
  createCustomersIntoDB,
  updateCustomersIntoDB,
  deleteCustomersFromDB,
};
