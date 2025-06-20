import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoresController } from './score.controller';
import { ScoreService } from './score.service';
import { Score } from './scores.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Score])
  ],
  controllers: [ScoresController],
  providers: [ScoreService],
  exports: [ScoreService]
})
export class ScoresModule {} 