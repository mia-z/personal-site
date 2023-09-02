/*
  Warnings:

  - The `dateCreated` column on the `ActiveTokens` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `dateUpdated` column on the `ActiveTokens` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `dateCreated` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `dateUpdated` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `dateCreated` column on the `Tag` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `dateUpdated` column on the `Tag` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `categoryId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `published` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActiveTokens" ADD COLUMN     "expires" TIMESTAMP(3) NOT NULL DEFAULT NOW() + interval '7 days',
DROP COLUMN "dateCreated",
ADD COLUMN     "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "dateUpdated",
ADD COLUMN     "dateUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "published" BOOLEAN NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
DROP COLUMN "dateCreated",
ADD COLUMN     "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "dateUpdated",
ADD COLUMN     "dateUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "dateCreated",
ADD COLUMN     "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "dateUpdated",
ADD COLUMN     "dateUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- NOT AUTO GENERATED
-- Auto update the updatedAt column whenever update is run against a table
CREATE OR REPLACE FUNCTION update_timestamp_function()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Update trigger on Post
CREATE TRIGGER update_timestamp_trigger
BEFORE UPDATE ON "Post"
FOR EACH ROW
EXECUTE FUNCTION update_timestamp_function();

-- Update trigger on ActiveTokens
CREATE TRIGGER update_timestamp_trigger
BEFORE UPDATE ON "ActiveTokens"
FOR EACH ROW
EXECUTE FUNCTION update_timestamp_function();

-- Update trigger on Tag
CREATE TRIGGER update_timestamp_trigger
BEFORE UPDATE ON "Tag"
FOR EACH ROW
EXECUTE FUNCTION update_timestamp_function();

-- Update trigger on Category
CREATE TRIGGER update_timestamp_trigger
BEFORE UPDATE ON "Category"
FOR EACH ROW
EXECUTE FUNCTION update_timestamp_function();