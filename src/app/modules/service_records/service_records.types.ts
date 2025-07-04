import type { ServiceStatus } from "@generated/prisma";

export type TServiceRecord = {
	bikeId: string;
	serviceDate: string;
	description: string;
	status: ServiceStatus;
};
