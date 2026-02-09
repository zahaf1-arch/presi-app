/*
  Warnings:

  - A unique constraint covering the columns `[nom_fr]` on the table `candidats` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `candidats_nom_fr_key` ON `candidats`(`nom_fr`);
