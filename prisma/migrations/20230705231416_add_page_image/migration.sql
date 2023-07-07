/*
  Warnings:

  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Page` ADD COLUMN `image` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `Example`;
