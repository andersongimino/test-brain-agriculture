import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { seed } from './seeds';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(private readonly connection: DataSource) {}

  async onApplicationBootstrap() {
    await this.seedDatabase();
  }

  private async seedDatabase() {
    console.log('Seeding database...');
    await seed(this.connection);
    console.log('Seeding completed!');
  }
}
