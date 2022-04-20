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

  constructor(cep?: Partial<Cep>) {
    this.cep = cep?.cep;
    this.logradouro = cep?.logradouro;
    this.complemento = cep?.complemento;
    this.bairro = cep?.bairro;
    this.localidade = cep?.localidade;
    this.uf = cep?.uf;
    this.ibge = cep?.ibge;
    this.gia = cep?.gia;
    this.ddd = cep?.ddd;
    this.siafi = cep?.siafi;
  }
}
