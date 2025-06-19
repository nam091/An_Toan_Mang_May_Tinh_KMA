import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { User } from '../users/user.entity';
import { ScoreService } from './score.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { GetUser } from '../auth/get-user.decorator';

@Controller('api/scores')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ScoresController {
  constructor(private readonly scoresService: ScoreService) {}

  @Post()
  @Roles('teacher', 'admin')
  create(@Body() createScoreDto: CreateScoreDto) {
    return this.scoresService.create(createScoreDto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.scoresService.findAll();
  }

  @Get('my-scores')
  @Roles('student')
  findMyScores(@GetUser() user: User) {
    return this.scoresService.findByStudentId(user.id);
  }

  @Get('by-subject/:subjectId')
  @Roles('teacher', 'admin')
  findBySubject(@Param('subjectId') subjectId: string) {
    return this.scoresService.findBySubject(subjectId);
  }
}