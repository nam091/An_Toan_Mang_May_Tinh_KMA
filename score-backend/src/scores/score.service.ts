import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './score.entity';
import { CreateScoreDto } from './dto/create-score.dto';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Score)
    private scoreRepository: Repository<Score>,
  ) {}

  async create(createScoreDto: CreateScoreDto): Promise<Score> {
    const score = this.scoreRepository.create(createScoreDto);
    return this.scoreRepository.save(score);
  }

  async findAll(): Promise<Score[]> {
    return this.scoreRepository.find();
  }

  async findByStudentId(studentId: number): Promise<Score[]> {
    return this.scoreRepository.find({ 
      where: { studentId } 
    });
  }

  async findBySubject(subjectId: string): Promise<Score[]> {
    return this.scoreRepository.find({ 
      where: { subjectId } 
    });
  }
} 