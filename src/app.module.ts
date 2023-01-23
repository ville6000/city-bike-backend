import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JourneysModule } from './journeys/journeys.module';
import { StationsModule } from './stations/stations.module';

@Module({
  imports: [JourneysModule, StationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
