import { PrismaClient, ServiceStatus } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

export { ServiceStatus, prisma };
