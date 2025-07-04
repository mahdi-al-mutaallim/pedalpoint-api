import prisma from "@shared/prisma";
import type { TBike } from "./bikes.types";

const createBikeIntoDB = async (payload: TBike) => {
	return await prisma.$transaction(async (tsx) => {
		await tsx.customer.findUniqueOrThrow({
			where: { customerId: payload.customerId },
		});

		return tsx.bike.create({
			data: payload,
		});
	});
};

const getBikesFromDB = async () => {
	return await prisma.bike.findMany();
};

const getBikeByIdFromDB = async (id: string) => {
	return await prisma.bike.findUniqueOrThrow({ where: { bikeId: id } });
};

export const BikesServices = {
	createBikeIntoDB,
	getBikesFromDB,
	getBikeByIdFromDB,
};
