import { ServiceStatus } from "@generated/prisma";
import prisma from "@shared/prisma";
import type { TServiceRecord } from "./service_records.types";

const createServiceRecordIntoDB = async (payload: TServiceRecord) => {
	return await prisma.$transaction(async (tsx) => {
		await tsx.bike.findUniqueOrThrow({ where: { bikeId: payload.bikeId } });
		return await tsx.serviceRecord.create({ data: payload });
	});
};

const getServiceRecordsFromDB = async () => {
	return await prisma.serviceRecord.findMany();
};

const getServiceRecordByIdFromDB = async (id: string) => {
	return await prisma.serviceRecord.findUniqueOrThrow({
		where: { serviceId: id },
	});
};

const updateServiceRecordByIdIntoDB = async (
	id: string,
	completionDate?: string | Date,
) => {
	return await prisma.serviceRecord.update({
		where: { serviceId: id },
		data: {
			status: ServiceStatus.done,
			...(completionDate ? { completionDate } : {}),
		},
	});
};

export const ServiceRecordsServices = {
	createServiceRecordIntoDB,
	getServiceRecordsFromDB,
	getServiceRecordByIdFromDB,
	updateServiceRecordByIdIntoDB,
};
