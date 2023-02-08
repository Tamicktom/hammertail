/*
  Warnings:

  - You are about to drop the column `pageType` on the `Page` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Page` DROP COLUMN `pageType`,
    ADD COLUMN `pageTypeId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `World` ADD COLUMN `end` BIGINT NOT NULL DEFAULT 0,
    ADD COLUMN `start` BIGINT NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `PageType` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `page_type_id` ON `Page`(`pageTypeId`);
