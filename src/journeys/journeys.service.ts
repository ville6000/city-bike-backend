import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class JourneysService {
  constructor(private prisma: PrismaService) {}

  async findAll(skip = 0) {
    return this.prisma.journey.findMany({ skip, take: 50 });
  }

  findOne(id: number) {
    return this.prisma.journey.findFirst({
      where: { id },
      include: {
        departureStation: true,
        returnStation: true,
      },
    });
  }
}
