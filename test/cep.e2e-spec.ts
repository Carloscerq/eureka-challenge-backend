import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Cep (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/41830498').expect(200).expect({
      cep: '41830498',
      logradouro: 'Rua Tenente Fernando Tuy',
      complemento: '',
      bairro: 'Pituba',
      localidade: 'Salvador',
      uf: 'BA',
      ibge: '2927408',
      gia: '',
      ddd: '71',
      siafi: '3849',
    });
  });
});
