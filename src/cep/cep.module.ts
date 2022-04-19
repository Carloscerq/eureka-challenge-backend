import { Module } from '@nestjs/common';
import { CepService } from './cep.service';
import { CepController } from './cep.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cep } from './entities/cep.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cep])],
  providers: [CepService],
  controllers: [CepController],
})
export class CepModule {}
