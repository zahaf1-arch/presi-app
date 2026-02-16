-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('admin', 'operator', 'guest');

-- CreateTable
CREATE TABLE "wilayas" (
    "id" SERIAL NOT NULL,
    "nom_fr" VARCHAR(100) NOT NULL,
    "nom_ar" VARCHAR(100) NOT NULL,
    "code" VARCHAR(10),
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wilayas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "moughataas" (
    "id" SERIAL NOT NULL,
    "nom_fr" VARCHAR(100) NOT NULL,
    "nom_ar" VARCHAR(100) NOT NULL,
    "code" VARCHAR(10),
    "wilaya_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "moughataas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "communes" (
    "id" SERIAL NOT NULL,
    "nom_fr" VARCHAR(100) NOT NULL,
    "nom_ar" VARCHAR(100) NOT NULL,
    "code" VARCHAR(10),
    "moughataa_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "communes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "centres" (
    "id" SERIAL NOT NULL,
    "nom_fr" VARCHAR(100) NOT NULL,
    "nom_ar" VARCHAR(100) NOT NULL,
    "code" VARCHAR(10),
    "commune_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "centres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bureaux" (
    "id" SERIAL NOT NULL,
    "nom_fr" VARCHAR(100) NOT NULL,
    "nom_ar" VARCHAR(100) NOT NULL,
    "nombre_inscrits" INTEGER DEFAULT 0,
    "nombre_votants" INTEGER DEFAULT 0,
    "centre_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bureaux_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidats" (
    "id" SERIAL NOT NULL,
    "nom_fr" VARCHAR(100) NOT NULL,
    "nom_ar" VARCHAR(100) NOT NULL,
    "photo" VARCHAR(255),
    "logo" VARCHAR(255),
    "couleur" VARCHAR(7) NOT NULL,
    "actif" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "candidats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "election_types" (
    "id" SERIAL NOT NULL,
    "nom_fr" VARCHAR(100) NOT NULL,
    "nom_ar" VARCHAR(100) NOT NULL,
    "date_election" DATE,
    "actif" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "election_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "user_role" NOT NULL DEFAULT 'guest',
    "wilaya_id" INTEGER,
    "avatar" VARCHAR(255),
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mustChangePassword" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resultats" (
    "id" SERIAL NOT NULL,
    "election_type_id" INTEGER NOT NULL,
    "bureau_id" INTEGER NOT NULL,
    "candidat_id" INTEGER NOT NULL,
    "nombre_voix" INTEGER DEFAULT 0,
    "voix_nuls" INTEGER DEFAULT 0,
    "voix_rejetes" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resultats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "geo_temp" (
    "Wilaya" VARCHAR(18),
    "MoughataaFr" VARCHAR(16),
    "Commune" VARCHAR(24),
    "Center" VARCHAR(45),
    "bureau" VARCHAR(48),
    "Wilaya_ar" VARCHAR(17),
    "MoughataaAr" VARCHAR(12),
    "Commune_ar" VARCHAR(20),
    "Center_ar" VARCHAR(48),
    "bureau_ar" VARCHAR(51),
    "nbr_Inscrits" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "wilaya_code" ON "wilayas"("code");

-- CreateIndex
CREATE UNIQUE INDEX "moughataa_code" ON "moughataas"("code");

-- CreateIndex
CREATE INDEX "idx_moughataas_wilaya" ON "moughataas"("wilaya_id");

-- CreateIndex
CREATE UNIQUE INDEX "commune_code" ON "communes"("code");

-- CreateIndex
CREATE INDEX "idx_communes_moughataa" ON "communes"("moughataa_id");

-- CreateIndex
CREATE UNIQUE INDEX "centre_code" ON "centres"("code");

-- CreateIndex
CREATE INDEX "idx_centres_commune" ON "centres"("commune_id");

-- CreateIndex
CREATE INDEX "idx_bureaux_centre" ON "bureaux"("centre_id");

-- CreateIndex
CREATE UNIQUE INDEX "candidats_nom_fr_key" ON "candidats"("nom_fr");

-- CreateIndex
CREATE UNIQUE INDEX "email" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_users_wilaya" ON "users"("wilaya_id");

-- CreateIndex
CREATE INDEX "idx_resultats_bureau" ON "resultats"("bureau_id");

-- CreateIndex
CREATE INDEX "idx_resultats_candidat" ON "resultats"("candidat_id");

-- CreateIndex
CREATE INDEX "idx_resultats_election" ON "resultats"("election_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "unique_result" ON "resultats"("election_type_id", "bureau_id", "candidat_id");

-- AddForeignKey
ALTER TABLE "moughataas" ADD CONSTRAINT "moughataas_ibfk_1" FOREIGN KEY ("wilaya_id") REFERENCES "wilayas"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "communes" ADD CONSTRAINT "communes_ibfk_1" FOREIGN KEY ("moughataa_id") REFERENCES "moughataas"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "centres" ADD CONSTRAINT "centres_ibfk_1" FOREIGN KEY ("commune_id") REFERENCES "communes"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "bureaux" ADD CONSTRAINT "bureaux_ibfk_1" FOREIGN KEY ("centre_id") REFERENCES "centres"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_ibfk_1" FOREIGN KEY ("wilaya_id") REFERENCES "wilayas"("id") ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "resultats" ADD CONSTRAINT "resultats_ibfk_1" FOREIGN KEY ("election_type_id") REFERENCES "election_types"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "resultats" ADD CONSTRAINT "resultats_ibfk_2" FOREIGN KEY ("bureau_id") REFERENCES "bureaux"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "resultats" ADD CONSTRAINT "resultats_ibfk_3" FOREIGN KEY ("candidat_id") REFERENCES "candidats"("id") ON DELETE CASCADE ON UPDATE RESTRICT;
