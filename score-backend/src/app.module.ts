import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ScoresModule } from './scores/scores.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cs: ConfigService) => ({
        type: 'postgres',
        host: cs.get('database.host'),
        port: cs.get('database.port'),
        username: cs.get('database.username'),
        password: cs.get('database.password'),
        database: cs.get('database.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // chỉ dev
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ScoresModule,
  ],
})
export class AppModule {}