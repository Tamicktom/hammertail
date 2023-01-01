/*
  Warnings:

  - Added the required column `type` to the `Block` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Block` DROP FOREIGN KEY `Block_pageId_fkey`;

-- DropForeignKey
ALTER TABLE `Page` DROP FOREIGN KEY `Page_worldId_fkey`;

-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_userId_fkey`;

-- DropForeignKey
ALTER TABLE `World` DROP FOREIGN KEY `World_ownerId_fkey`;

-- AlterTable
ALTER TABLE `Block` ADD COLUMN `type` VARCHAR(191) NOT NULL;

-- RenameIndex
ALTER TABLE `Account` RENAME INDEX `Account_userId_fkey` TO `user_id`;

-- RenameIndex
ALTER TABLE `Block` RENAME INDEX `Block_pageId_fkey` TO `page_id`;

-- RenameIndex
ALTER TABLE `Page` RENAME INDEX `Page_worldId_fkey` TO `world_id`;

-- RenameIndex
ALTER TABLE `Session` RENAME INDEX `Session_userId_fkey` TO `user_id`;

-- RenameIndex
ALTER TABLE `World` RENAME INDEX `World_ownerId_fkey` TO `owner_id`;
