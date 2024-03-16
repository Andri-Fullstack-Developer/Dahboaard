-- CreateTable
CREATE TABLE "Galerys" (
    "id" SERIAL NOT NULL,
    "id_Galery" TEXT NOT NULL,
    "title" VARCHAR(255),
    "content" TEXT,
    "img_url" TEXT,
    "categor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Galerys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Yusers" (
    "id" SERIAL NOT NULL,
    "usename" VARCHAR(255),
    "name" VARCHAR(255),
    "email" VARCHAR(255),
    "passwors" VARCHAR(255),
    "role" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Yusers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Galerys_id_Galery_key" ON "Galerys"("id_Galery");

-- CreateIndex
CREATE UNIQUE INDEX "Yusers_usename_key" ON "Yusers"("usename");
