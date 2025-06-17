import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async upsertFromKeycloak(dto: Partial<User>): Promise<User> {
    const existing = await this.repo.findOne({ where: { sub: dto.sub } });
    if (existing) {
      return this.repo.save({ ...existing, ...dto });
    }
    const user = this.repo.create(dto);
    return this.repo.save(user);
  }

  async findOne(sub: string) {
    return this.repo.findOne({ where: { sub } });
  }
}