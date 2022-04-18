import { Module } from '@nestjs/common';
import { CepInformationsModule } from './cep-informations/cep-informations.module';
import { CepModule } from './cep/cep.module';

@Module({
  imports: [CepInformationsModule, CepModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
