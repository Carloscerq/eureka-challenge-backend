import { IsNumberString, Length } from 'class-validator';

export class IGetCep {
  @IsNumberString()
  @Length(8, 8)
  cep: string;
}
