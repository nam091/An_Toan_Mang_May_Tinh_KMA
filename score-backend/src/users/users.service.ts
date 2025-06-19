import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async upsertFromKeycloak(dto: Partial<User>): Promise<User> {
    const existing = await this.repo.findOne({ where: { sub: dto.sub } });
    
    if (existing) {
      return this.repo.save({ ...existing, ...dto });
    }
    
    const user = this.repo.create(dto);
    return this.repo.save(user);
  }

  async findBySub(sub: string): Promise<User> {
    const user = await this.repo.findOne({ where: { sub } });
    
    if (!user) {
      throw new NotFoundException(`Người dùng với ID ${sub} không tồn tại`);
    }
    
    return user;
  }

  async findOne(sub: string): Promise<User> {
    return this.findBySub(sub);
  }
}