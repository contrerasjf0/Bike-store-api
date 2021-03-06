import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../config';


const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'my_db',
  password: '123456',
  port: 5432,
});

client.connect();

@Global()
@Module({
  imports: [
  TypeOrmModule.forRootAsync({
    inject: [config.KEY],
    useFactory: (configService: ConfigType<typeof config>) => {
      const { user, host, dbName, password, port } = configService.postgres;
      return {
        type: 'postgres',
        url: configService.postgresUrl,
        synchronize: false,
        autoLoadEntities: true,
        ssl: {
          rejectUnauthorized: false,
        },
      };
    },
  }),
],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'DBClient',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configService.database.postgres;
        const client = new Client({
          connectionString: configService.postgresUrl,
          ssl: {
            rejectUnauthorized: false,
          },
        });
        client.connect();
        return client;
      },
      inject: [config.KEY], 
    },
  ],
  exports: ['API_KEY', 'DBClient', TypeOrmModule],
})
export class DatabaseModule {}