-- CreateTable
CREATE TABLE `wilayas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_fr` VARCHAR(100) NOT NULL,
    `nom_ar` VARCHAR(100) NOT NULL,
    `code` VARCHAR(10) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `code`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `moughataas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_fr` VARCHAR(100) NOT NULL,
    `nom_ar` VARCHAR(100) NOT NULL,
    `code` VARCHAR(10) NULL,
    `wilaya_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `code`(`code`),
    INDEX `idx_moughataas_wilaya`(`wilaya_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `communes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_fr` VARCHAR(100) NOT NULL,
    `nom_ar` VARCHAR(100) NOT NULL,
    `code` VARCHAR(10) NULL,
    `moughataa_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `code`(`code`),
    INDEX `idx_communes_moughataa`(`moughataa_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `centres` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_fr` VARCHAR(100) NOT NULL,
    `nom_ar` VARCHAR(100) NOT NULL,
    `code` VARCHAR(10) NULL,
    `commune_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `code`(`code`),
    INDEX `idx_centres_commune`(`commune_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bureaux` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_fr` VARCHAR(100) NOT NULL,
    `nom_ar` VARCHAR(100) NOT NULL,
    `nombre_inscrits` INTEGER NULL DEFAULT 0,
    `nombre_votants` INTEGER NULL DEFAULT 0,
    `centre_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_bureaux_centre`(`centre_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `candidats` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_fr` VARCHAR(100) NOT NULL,
    `nom_ar` VARCHAR(100) NOT NULL,
    `photo` VARCHAR(255) NULL,
    `logo` VARCHAR(255) NULL,
    `couleur` VARCHAR(7) NOT NULL,
    `actif` BOOLEAN NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `election_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_fr` VARCHAR(100) NOT NULL,
    `nom_ar` VARCHAR(100) NOT NULL,
    `date_election` DATE NULL,
    `actif` BOOLEAN NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('admin', 'operator', 'guest') NOT NULL DEFAULT 'guest',
    `wilaya_id` INTEGER NULL,
    `avatar` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `mustChangePassword` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `email`(`email`),
    INDEX `idx_users_wilaya`(`wilaya_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resultats` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `election_type_id` INTEGER NOT NULL,
    `bureau_id` INTEGER NOT NULL,
    `candidat_id` INTEGER NOT NULL,
    `nombre_voix` INTEGER NULL DEFAULT 0,
    `voix_nuls` INTEGER NULL DEFAULT 0,
    `voix_rejetes` INTEGER NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_resultats_bureau`(`bureau_id`),
    INDEX `idx_resultats_candidat`(`candidat_id`),
    INDEX `idx_resultats_election`(`election_type_id`),
    UNIQUE INDEX `unique_result`(`election_type_id`, `bureau_id`, `candidat_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `geo_temp` (
    `Wilaya` VARCHAR(18) NULL,
    `MoughataaFr` VARCHAR(16) NULL,
    `Commune` VARCHAR(24) NULL,
    `Center` VARCHAR(45) NULL,
    `bureau` VARCHAR(48) NULL,
    `Wilaya_ar` VARCHAR(17) NULL,
    `MoughataaAr` VARCHAR(12) NULL,
    `Commune_ar` VARCHAR(20) NULL,
    `Center_ar` VARCHAR(48) NULL,
    `bureau_ar` VARCHAR(51) NULL,
    `nbr_Inscrits` INTEGER NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `moughataas` ADD CONSTRAINT `moughataas_ibfk_1` FOREIGN KEY (`wilaya_id`) REFERENCES `wilayas`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `communes` ADD CONSTRAINT `communes_ibfk_1` FOREIGN KEY (`moughataa_id`) REFERENCES `moughataas`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `centres` ADD CONSTRAINT `centres_ibfk_1` FOREIGN KEY (`commune_id`) REFERENCES `communes`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `bureaux` ADD CONSTRAINT `bureaux_ibfk_1` FOREIGN KEY (`centre_id`) REFERENCES `centres`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`wilaya_id`) REFERENCES `wilayas`(`id`) ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `resultats` ADD CONSTRAINT `resultats_ibfk_1` FOREIGN KEY (`election_type_id`) REFERENCES `election_types`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `resultats` ADD CONSTRAINT `resultats_ibfk_2` FOREIGN KEY (`bureau_id`) REFERENCES `bureaux`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `resultats` ADD CONSTRAINT `resultats_ibfk_3` FOREIGN KEY (`candidat_id`) REFERENCES `candidats`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
