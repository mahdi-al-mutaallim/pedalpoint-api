import type { ServiceStatus } from "../../shared/prisma.js";

export type TServiceRecord = {
	bikeId: string;
	serviceDate: string;
	description: string;
	status: keyof typeof ServiceStatus;
};
