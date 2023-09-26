/*
  Warnings:

  - A unique constraint covering the columns `[blockchainId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `blockchainId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('EXPERT', 'PUBLIC_ADMIN', 'MANTAINER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('INPROGRESS', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "OperationType" AS ENUM ('CREATE', 'UPDATE', 'TRANSFER', 'INVALIDATE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "blockchainId" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'EXPERT',
ADD COLUMN     "surname" TEXT;

-- CreateTable
CREATE TABLE "Case" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'INPROGRESS',

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "token" TEXT NOT NULL,
    "userInChargeId" INTEGER NOT NULL,
    "caseRelatedId" INTEGER NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "Operation" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "blockReference" INTEGER NOT NULL,
    "operationType" "OperationType" NOT NULL,
    "tokenId" TEXT NOT NULL,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,

    CONSTRAINT "Operation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_blockchainId_key" ON "User"("blockchainId");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userInChargeId_fkey" FOREIGN KEY ("userInChargeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_caseRelatedId_fkey" FOREIGN KEY ("caseRelatedId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Token"("token") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
