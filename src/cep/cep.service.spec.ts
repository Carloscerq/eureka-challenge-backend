import { Test, TestingModule } from '@nestjs/testing';
import { CepService } from './cep.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cep } from './entities/cep.entity';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('CepService', () => {
  let service: CepService;

  const cep: Cep = new Cep({
    cep: '12345678',
    logradouro: 'Rua Teste',
    bairro: 'Bairro Teste',
    localidade: 'Cidade Teste',
    uf: 'SP',
    ibge: '12345',
    gia: '12345',
    ddd: '11',
    siafi: '12345',
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CepService,
        {
          provide: getRepositoryToken(Cep),
          useValue: {
            findOne: jest.fn().mockResolvedValue(cep),
            save: jest.fn().mockResolvedValue(cep),
            create: jest.fn().mockResolvedValue(cep),
          },
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn().mockImplementation(() => of({ data: cep })),
          },
        },
      ],
    }).compile();

    service = module.get<CepService>(CepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find one from db', async () => {
    const result = await service.getCepFromDb('12345678');
    expect(result).toEqual(cep);
  });

  it('should save one in db', () => {
    const result = service.addCepToDb(cep);
    expect(result);
  });

  it('should return cep from API', async () => {
    const response = await service.getCepFromApi('12345678');
    expect(response).toEqual(cep);
  });
});
