/*
  Warnings:

  - You are about to alter the column `end` on the `World` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `start` on the `World` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `World` ADD COLUMN `image` VARCHAR(191) NULL,
    MODIFY `end` INTEGER NOT NULL DEFAULT 0,
    MODIFY `start` INTEGER NOT NULL DEFAULT 0;
