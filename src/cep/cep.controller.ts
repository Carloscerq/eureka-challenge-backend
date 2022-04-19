import { Controller, Get, Param, Logger } from '@nestjs/common';
import { IGetCep } from './dto/getCepParam.dto';
import { CepService } from './cep.service';
import { Cep } from './entities/cep.entity';

@Controller('')
export class CepController {
  constructor(private readonly cepService: CepService) {}

  private readonly logger = new Logger('CepController');

  @Get('/:cep')
  async getCep(@Param() params: IGetCep): Promise<Cep> {
    this.logger.log(`Getting Cep: ${params.cep}`);

    const cepInDb = await this.cepService.getCepFromDb(params.cep);

    if (cepInDb) {
      this.logger.log(`Cep found in db: ${cepInDb.cep}`);
      return cepInDb;
    }

    const cepFromApi = await this.cepService.getCepFromApi(params.cep);
    this.cepService.addCepToDb(cepFromApi);
    this.logger.log(`Cep found in api: ${cepFromApi.cep}`);
    return cepFromApi;
  }
}
