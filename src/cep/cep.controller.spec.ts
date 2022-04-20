import { Test, TestingModule } from '@nestjs/testing';
import { CepController } from './cep.controller';
import { CepService } from './cep.service';
import { Cep } from './entities/cep.entity';
import { IGetCep } from './dto/getCepParam.dto';

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

describe('CepController', () => {
  let controller: CepController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CepController],
      providers: [
        {
          provide: CepService,
          useValue: {
            getCepFromDb: jest.fn().mockResolvedValue(cep),
            getCepFromApi: jest.fn().mockResolvedValue(cep),
            saveCep: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    controller = module.get<CepController>(CepController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a cep', async () => {
    const getCep: IGetCep = {
      cep: '12345678',
    };
    const result = await controller.getCep(getCep);
    expect(result).toEqual(cep);
  });
});
