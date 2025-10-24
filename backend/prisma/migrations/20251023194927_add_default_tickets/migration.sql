/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `History` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "qtd_tickets" INTEGER NOT NULL DEFAULT 3;

-- CreateIndex
CREATE UNIQUE INDEX "History_userId_key" ON "History"("userId");
