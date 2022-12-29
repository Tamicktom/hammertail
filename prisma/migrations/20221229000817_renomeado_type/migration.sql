/*
  Warnings:

  - You are about to drop the column `type` on the `Block` table. All the data in the column will be lost.
  - Added the required column `blockType` to the `Block` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Block` DROP COLUMN `type`,
    ADD COLUMN `blockType` VARCHAR(191) NOT NULL;
