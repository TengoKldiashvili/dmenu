-- CreateEnum
CREATE TYPE "MenuStatus" AS ENUM ('DRAFT', 'ACTIVE');

-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "status" "MenuStatus" NOT NULL DEFAULT 'DRAFT',
ALTER COLUMN "title" DROP NOT NULL;
