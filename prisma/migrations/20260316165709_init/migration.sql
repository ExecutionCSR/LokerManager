/*
  Warnings:

  - You are about to drop the `locker_assignment_history` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "locker_assignment_history" DROP CONSTRAINT "locker_assignment_history_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "locker_assignment_history" DROP CONSTRAINT "locker_assignment_history_lockerId_fkey";

-- DropTable
DROP TABLE "locker_assignment_history";

-- DropEnum
DROP TYPE "LockerHistoryAction";
