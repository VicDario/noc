/*
  Warnings:

  - Added the required column `origin` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Log" ADD COLUMN     "origin" TEXT NOT NULL;
