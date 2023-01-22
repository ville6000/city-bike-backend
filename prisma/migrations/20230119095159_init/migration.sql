-- CreateTable
CREATE TABLE "Station" (
    "id" SERIAL NOT NULL,
    "identifier" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "operator" TEXT,
    "capacity" INTEGER NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Station_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Journey" (
    "id" SERIAL NOT NULL,
    "departedAt" TIMESTAMP(3) NOT NULL,
    "returnedAt" TIMESTAMP(3) NOT NULL,
    "departureStationId" INTEGER NOT NULL,
    "departureStationName" TEXT NOT NULL,
    "returnStationId" INTEGER NOT NULL,
    "returnStationName" TEXT NOT NULL,
    "distance" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Journey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Station_identifier_key" ON "Station"("identifier");

-- AddForeignKey
ALTER TABLE "Journey" ADD CONSTRAINT "Journey_departureStationId_fkey" FOREIGN KEY ("departureStationId") REFERENCES "Station"("identifier") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Journey" ADD CONSTRAINT "Journey_returnStationId_fkey" FOREIGN KEY ("returnStationId") REFERENCES "Station"("identifier") ON DELETE RESTRICT ON UPDATE CASCADE;
