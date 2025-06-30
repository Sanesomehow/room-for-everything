/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PostTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('LINK', 'TEXT', 'IMAGE');

-- DropForeignKey
ALTER TABLE "_PostTag" DROP CONSTRAINT "_PostTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostTag" DROP CONSTRAINT "_PostTag_B_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "type" "ItemType" NOT NULL DEFAULT 'LINK',
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "googleId" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "profilePicture" TEXT,
ALTER COLUMN "password" DROP NOT NULL;

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_PostTag";
