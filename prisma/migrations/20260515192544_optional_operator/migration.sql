-- DropForeignKey
ALTER TABLE "AccessLog" DROP CONSTRAINT "AccessLog_operatorId_fkey";

-- AlterTable
ALTER TABLE "AccessLog" ALTER COLUMN "operatorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "AccessLog" ADD CONSTRAINT "AccessLog_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
