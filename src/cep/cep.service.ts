import { Injectable, Logger, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cep } from './entities/cep.entity';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CepService {
  private readonly logger = new Logger('CepService');

  constructor(
    @InjectRepository(Cep)
    private readonly cepRepository: Repository<Cep>,
    private readonly httpService: HttpService,
  ) {}

  async getCepFromDb(cep: string): Promise<Cep> {
    try {
      const cepFromDb = await this.cepRepository.findOne({
        where: { cep },
      });
      return cepFromDb;
    } catch (error) {
      this.logger.error(`Error on getCepFromDb: ${error.message}`);
      throw new InternalServerErrorException();
    }
  }

  // Transform to promise to keep the same interface
  async getCepFromApi(cep: string): Promise<Cep> {
    try {
      return lastValueFrom(
        <Observable<Cep>>this.httpService.get(`${cep}/json/`).pipe(
          map((response) => {
            if (response.data.erro) {
              throw new BadRequestException('CEP não encontrado');
            }

            response.data.cep = cep;
            return response.data;
          }),
        ),
      );
    } catch (error) {
      this.logger.error(`Error on getCepFromApi: ${error.message}`);
      throw new InternalServerErrorException();
    }
  }

  addCepToDb(cep: Cep) {
    try {
      const newCepEntity = this.cepRepository.create(cep);
      this.cepRepository.save(newCepEntity);
    } catch (error) {
      this.logger.error(`Error on addCepToDb: ${error.message}`);
      throw new InternalServerErrorException();
    }
  }
}
