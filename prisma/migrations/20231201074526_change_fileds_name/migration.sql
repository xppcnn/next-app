/*
  Warnings:

  - You are about to drop the column `assignedToUserId` on the `issue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `issue` DROP FOREIGN KEY `issue_assignedToUserId_fkey`;

-- AlterTable
ALTER TABLE `issue` DROP COLUMN `assignedToUserId`,
    ADD COLUMN `assigned_to_user_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `issue` ADD CONSTRAINT `issue_assigned_to_user_id_fkey` FOREIGN KEY (`assigned_to_user_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
