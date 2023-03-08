/*
  Warnings:

  - Added the required column `pageType` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Page` ADD COLUMN `pageType` VARCHAR(191) NOT NULL;
