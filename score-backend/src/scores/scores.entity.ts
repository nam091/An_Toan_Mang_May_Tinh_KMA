import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'scores' })
export class Score {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 5, scale: 2 })
  value: number;

  @Column()
  studentId: number;

  @Column()
  subjectId: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
