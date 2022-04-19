import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cep } from './entities/cep.entity';

@Injectable()
export class CepService {
  private readonly logger = new Logger('CepService');

  constructor(
    @InjectRepository(Cep)
    private readonly cepRepository: Repository<Cep>,
  ) {}

  getCepFromDb(cep: string) {
    return `${cep}`;
  }

  getCepFromApi(cep: string) {
    return `${cep}`;
  }

  addCepToDb(cep: string) {
    return `${cep}`;
  }
}
