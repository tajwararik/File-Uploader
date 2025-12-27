/*
  Warnings:

  - A unique constraint covering the columns `[file_name,folder_id,user_id]` on the table `files` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "files_file_name_folder_id_key";

-- AlterTable
ALTER TABLE "files" ALTER COLUMN "folder_id" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "files_file_name_folder_id_user_id_key" ON "files"("file_name", "folder_id", "user_id");
