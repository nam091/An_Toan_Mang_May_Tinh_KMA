import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateScoreDto {
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @IsNotEmpty()
  @IsString()
  subjectId: string;

  @IsOptional()
  @IsString()
  description?: string;
} 