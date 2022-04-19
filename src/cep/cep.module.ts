import { Module } from '@nestjs/common';
import { CepService } from './cep.service';
import { CepController } from './cep.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cep } from './entities/cep.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cep]),
    HttpModule.register({
      baseURL: 'https://viacep.com.br/ws/',
      timeout: 5000,
    }),
  ],
  providers: [CepService],
  controllers: [CepController],
})
export class CepModule {}
