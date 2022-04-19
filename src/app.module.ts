import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CepModule } from './cep/cep.module';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
      entities: ['dist/**/*entity.js'],
      migrations: ['dist/migration/*.js'],
      subscribers: ['src/subscriber/**/*.ts'],
    }),
    CepModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
