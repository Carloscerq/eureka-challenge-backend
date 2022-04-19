import { Injectable, Logger, BadRequestException } from '@nestjs/common';
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

  async getCepFromDb(cep: string): Promise<Cep> {
    try {
      const cepFromDb = await this.cepRepository.findOne({
        where: { cep: cep },
      });
      return cepFromDb;
    } catch (error) {
      this.logger.error(`Error on getCepFromDb: ${error.message}`);
      throw new BadRequestException();
    }
  }

  getCepFromApi(cep: string) {
    return `${cep}`;
  }

  addCepToDb(cep: string) {
    return `${cep}`;
  }
}
