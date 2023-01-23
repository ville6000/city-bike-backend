import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StationsService {
  constructor(private prisma: PrismaService) {}

  async findAll(skip = 0) {
    return this.prisma.station.findMany({ skip, take: 500 });
  }

  findOne(identifier: number) {
    return this.prisma.station.findFirst({
      where: { identifier },
    });
  }
}
