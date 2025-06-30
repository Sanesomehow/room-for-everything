/*
  Warnings:

  - You are about to drop the column `externalURl` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `imageURl` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `videoURL` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "externalURl",
DROP COLUMN "imageURl",
DROP COLUMN "videoURL",
ADD COLUMN     "url" TEXT,
ALTER COLUMN "title" DROP NOT NULL;
