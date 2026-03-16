-- CreateEnum
CREATE TYPE "LockerStatus" AS ENUM ('LIVRE', 'OCUPADO');

-- CreateEnum
CREATE TYPE "LockerHistoryAction" AS ENUM ('ASSOCIADO', 'ALTERADO', 'REMOVIDO');

-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "setor" TEXT NOT NULL,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lockers" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "status" "LockerStatus" NOT NULL DEFAULT 'LIVRE',
    "employeeId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lockers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locker_assignment_history" (
    "id" SERIAL NOT NULL,
    "lockerId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataFim" TIMESTAMP(3),
    "observacao" TEXT,
    "acao" "LockerHistoryAction" NOT NULL DEFAULT 'ASSOCIADO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "locker_assignment_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");

-- CreateIndex
CREATE UNIQUE INDEX "lockers_numero_key" ON "lockers"("numero");

-- CreateIndex
CREATE INDEX "lockers_employeeId_idx" ON "lockers"("employeeId");

-- CreateIndex
CREATE INDEX "locker_assignment_history_lockerId_idx" ON "locker_assignment_history"("lockerId");

-- CreateIndex
CREATE INDEX "locker_assignment_history_employeeId_idx" ON "locker_assignment_history"("employeeId");

-- CreateIndex
CREATE INDEX "locker_assignment_history_dataInicio_idx" ON "locker_assignment_history"("dataInicio");

-- AddForeignKey
ALTER TABLE "lockers" ADD CONSTRAINT "lockers_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locker_assignment_history" ADD CONSTRAINT "locker_assignment_history_lockerId_fkey" FOREIGN KEY ("lockerId") REFERENCES "lockers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locker_assignment_history" ADD CONSTRAINT "locker_assignment_history_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
