import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Cep {
  @PrimaryColumn()
  cep: string;

  @Column()
  logradouro: string;

  @Column()
  complemento: string;

  @Column()
  bairro: string;

  @Column()
  localidade: string;

  @Column()
  uf: string;

  @Column()
  ibge: string;

  @Column()
  gia: string;

  @Column()
  ddd: string;

  @Column()
  siafi: string;
}
