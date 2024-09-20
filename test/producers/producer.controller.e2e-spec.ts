import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../../src/app.module';
import { CreateProducerDto } from './../../src/producers/dto/create-producer.dto';
import { UpdateProducerDto } from './../../src/producers/dto/update-producer.dto';

describe('ProducerController (e2e)', () => {
  let app: INestApplication;
  let producerId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/producer (POST)', async () => {
    const createProducerDto: CreateProducerDto = {
        cpfCnpj: '10067734448',
        nameProducer: 'Anderson Gimino',
        nameFarm: 'Balerina Farm',
        city: 'Recife',
        state: 'Pernambuco',
        totalArea: 1000,
        arableArea: 800,
        vegetationArea: 200,
        culturesIds: ['447eab2d-0031-4e16-8821-99481d715949']
    };

    const response = await request(app.getHttpServer())
      .post('/producer')
      .send(createProducerDto)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.nameProducer).toBe(createProducerDto.nameProducer);
    expect(response.body.nameFarm).toBe(createProducerDto.nameFarm);
    expect(response.body.city).toBe(createProducerDto.city);
    expect(response.body.state).toBe(createProducerDto.state);
    expect(response.body.totalArea).toBe(createProducerDto.totalArea);
    expect(response.body.arableArea).toBe(createProducerDto.arableArea);
    expect(response.body.vegetationArea).toBe(createProducerDto.vegetationArea);

    producerId = response.body.id;
  });

  it('/producer (GET)', () => {
    return request(app.getHttpServer())
      .get('/producer')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
      });
  });

  it('/producer/:id (GET)', () => {
    return request(app.getHttpServer())
      .get(`/producer/${producerId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id', producerId);
        expect(res.body).toHaveProperty('nameProducer');
        expect(res.body).toHaveProperty('nameFarm');
      });
  });

  it('/producer/:id (PUT)', () => {
    const updateProducerDto: UpdateProducerDto = {
        cpfCnpj: '10067734448',
        nameProducer: 'Anderson Gimino',
        nameFarm: 'Balerina Farm',
        city: 'Recife',
        state: 'Pernambuco',
        totalArea: 1000,
        arableArea: 800,
        vegetationArea: 200,
        culturesIds: ['447eab2d-0031-4e16-8821-99481d715949']
    };

    return request(app.getHttpServer())
      .put(`/producer/${producerId}`)
      .send(updateProducerDto)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id', producerId);
        expect(res.body.nameProducer).toBe(updateProducerDto.nameProducer);
        expect(res.body.nameFarm).toBe(updateProducerDto.nameFarm);
        expect(res.body.city).toBe(updateProducerDto.city);
        expect(res.body.state).toBe(updateProducerDto.state);
        expect(res.body.totalArea).toBe(updateProducerDto.totalArea);
        expect(res.body.arableArea).toBe(updateProducerDto.arableArea);
        expect(res.body.vegetationArea).toBe(updateProducerDto.vegetationArea);
      });
  });

  it('/producer/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/producer/${producerId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({});
      });
  });

  it('/producer/:id (GET) after deletion', () => {
    return request(app.getHttpServer())
      .get(`/producer/${producerId}`)
      .expect(404);
  });
});
