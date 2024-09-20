import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProducerModule } from './producers/producer.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CultureModule } from './cultures/culture.module';
import { Producer } from './producers/producer.entity';
import { Culture } from './cultures/culture.entity';
import { DashboardModule } from './dashboards/dashboard.module';
import { SeedService } from './seeds/seed.service';
import { APP_PIPE } from '@nestjs/core';
import { IsCpfOrCnpj } from './validators/is-cpf-cnpj.validator';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Producer, Culture],
      synchronize: true
    }),
    CultureModule,
    DashboardModule,
    ProducerModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SeedService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },
    IsCpfOrCnpj
  ],
})
export class AppModule {}
