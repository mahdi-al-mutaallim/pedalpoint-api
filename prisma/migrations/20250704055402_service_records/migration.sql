/*
  Warnings:

  - The values [PENDING,IN_PROGRESS,DONE] on the enum `ServiceStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `ServiceRecord` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ServiceStatus_new" AS ENUM ('pending', 'in_progress', 'done');
ALTER TABLE "ServiceRecord" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "service_records" ALTER COLUMN "status" TYPE "ServiceStatus_new" USING ("status"::text::"ServiceStatus_new");
ALTER TYPE "ServiceStatus" RENAME TO "ServiceStatus_old";
ALTER TYPE "ServiceStatus_new" RENAME TO "ServiceStatus";
DROP TYPE "ServiceStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "ServiceRecord" DROP CONSTRAINT "ServiceRecord_bikeId_fkey";

-- DropTable
DROP TABLE "ServiceRecord";

-- CreateTable
CREATE TABLE "service_records" (
    "serviceId" TEXT NOT NULL,
    "bikeId" TEXT NOT NULL,
    "serviceDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" VARCHAR(255) NOT NULL,
    "completionDate" DATE,
    "status" "ServiceStatus" NOT NULL DEFAULT 'pending',

    CONSTRAINT "service_records_pkey" PRIMARY KEY ("serviceId")
);

-- AddForeignKey
ALTER TABLE "service_records" ADD CONSTRAINT "service_records_bikeId_fkey" FOREIGN KEY ("bikeId") REFERENCES "bikes"("bikeId") ON DELETE RESTRICT ON UPDATE CASCADE;
