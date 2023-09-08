-- AlterTable
ALTER TABLE "ActiveTokens" ALTER COLUMN "expires" SET DEFAULT NOW() + interval '7 days';

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "content" DROP NOT NULL,
ALTER COLUMN "published" SET DEFAULT false;
