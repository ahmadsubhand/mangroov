/*
  Warnings:

  - You are about to drop the column `photo` on the `reports` table. All the data in the column will be lost.
  - Added the required column `photo_id` to the `reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo_url` to the `reports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."reports" DROP COLUMN "photo",
ADD COLUMN     "photo_id" TEXT NOT NULL,
ADD COLUMN     "photo_url" TEXT NOT NULL;
