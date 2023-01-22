import * as process from 'process';

const fs = require('fs');
import { parse } from 'csv-parse';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface IStation {
  id: number;
  identifier: number;
  name: string;
  address: string;
  city: string;
  operator: string;
  capacity: number;
  latitude: string;
  longitude: string;
}

interface IJourney {
  id?: number;
  departedAt: Date;
  returnedAt: Date;
  departureStation: object;
  departureStationId: number;
  departureStationName: string;
  returnStation: object;
  returnStationId: number;
  returnStationName: string;
  distance: number;
  duration: number;
}

async function main() {
  await getStations();
  await getJourneys();
}

async function getStations() {
  fs.createReadStream('./prisma/seed_stations.csv')
    .pipe(parse({ delimiter: ',', from_line: 2 }))
    .on('data', async function (row) {
      const data: IStation = {
        id: Number(row[0]),
        identifier: Number(row[1]),
        name: row[2],
        address: row[5],
        city: row[7],
        operator: row[9],
        capacity: Number(row[10]),
        latitude: row[11],
        longitude: row[12],
      };

      await prisma.station.upsert({
        update: {},
        where: { id: Number(row[0]) },
        create: data,
      });
    });
}

async function getJourneys() {
  const files = [
    './prisma/seed_journeys1.csv',
    './prisma/seed_journeys2.csv',
    './prisma/seed_journeys3.csv',
  ];

  const stations = await prisma.station.findMany({
    where: {},
    select: { identifier: true },
  });

  const stationIdList = stations.map((s) => s.identifier);

  files.forEach((file) => {
    const inserts = [];

    fs.createReadStream(file)
      .pipe(parse({ delimiter: ',', from_line: 2 }))
      .on('data', async function (row) {
        const data = {
          departedAt: new Date(row[0]),
          returnedAt: new Date(row[1]),
          departureStationId: Number(row[2]),
          departureStationName: row[3],
          returnStationId: Number(row[4]),
          returnStationName: row[5],
          distance: Number(parseInt(row[6], 10)),
          duration: Number(row[7]),
        };

        if (data.distance >= 10 && data.duration >= 10) {
          if (
            stationIdList.includes(data.departureStationId) &&
            stationIdList.includes(data.returnStationId)
          ) {
            inserts.push(data);
          }
        }
      })
      .on('close', async function () {
        await prisma.journey.createMany({ data: inserts });
      });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
