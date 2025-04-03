-- CreateTable
CREATE TABLE "Gun" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "caliber" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "actionType" TEXT NOT NULL,
    "category" TEXT,
    "effectiveRange" INTEGER,

    CONSTRAINT "Gun_pkey" PRIMARY KEY ("id")
);
