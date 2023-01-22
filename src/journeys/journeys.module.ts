import { Module } from '@nestjs/common';
import { JourneysService } from './journeys.service';
import { JourneysController } from './journeys.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [JourneysController],
  providers: [JourneysService, PrismaService],
})
export class JourneysModule {}
