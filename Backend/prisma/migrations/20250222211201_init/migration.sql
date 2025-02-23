-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `fullname` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `creation_date` DATETIME(3) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product_has_Category` (
    `product` VARCHAR(191) NOT NULL,
    `category` INTEGER NOT NULL,

    PRIMARY KEY (`product`, `category`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id` VARCHAR(191) NOT NULL,
    `user` VARCHAR(191) NOT NULL,
    `product` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NULL,
    `rating` INTEGER NOT NULL,

    PRIMARY KEY (`id`, `user`, `product`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cart` (
    `id` VARCHAR(191) NOT NULL,
    `user` VARCHAR(191) NOT NULL,
    `creation_date` DATETIME(3) NOT NULL,
    `is_resolved` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`, `user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cart_has_Product` (
    `cart` VARCHAR(191) NOT NULL,
    `user` VARCHAR(191) NOT NULL,
    `product` VARCHAR(191) NOT NULL,
    `quntity` INTEGER NOT NULL,

    PRIMARY KEY (`cart`, `user`, `product`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product_has_Category` ADD CONSTRAINT `Product_has_Category_category_fkey` FOREIGN KEY (`category`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product_has_Category` ADD CONSTRAINT `Product_has_Category_product_fkey` FOREIGN KEY (`product`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_user_fkey` FOREIGN KEY (`user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_product_fkey` FOREIGN KEY (`product`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_user_fkey` FOREIGN KEY (`user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart_has_Product` ADD CONSTRAINT `Cart_has_Product_cart_user_fkey` FOREIGN KEY (`cart`, `user`) REFERENCES `Cart`(`id`, `user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart_has_Product` ADD CONSTRAINT `Cart_has_Product_product_fkey` FOREIGN KEY (`product`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
