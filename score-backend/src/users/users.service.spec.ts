// score-backend/src/users/users.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

// Tạo một mock repository
const mockUserRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  // Reset các mock sau mỗi test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('upsertFromKeycloak', () => {
    const keycloakUser = {
      sub: 'test-sub',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      roles: ['student'],
    };

    it('should create a new user if the user does not exist', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);
      // Giả lập hàm create trả về chính user data
      mockUserRepository.create.mockReturnValue(keycloakUser); 
      // Giả lập hàm save trả về user đã lưu
      mockUserRepository.save.mockResolvedValue(keycloakUser);

      const result = await service.upsertFromKeycloak(keycloakUser);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { sub: keycloakUser.sub } });
      expect(repository.create).toHaveBeenCalledWith(keycloakUser);
      expect(repository.save).toHaveBeenCalledWith(keycloakUser);
      expect(result).toEqual(keycloakUser);
    });

    it('should update an existing user if the user exists', async () => {
      const existingUser = { ...keycloakUser, firstName: 'OldFirstName' };
      mockUserRepository.findOne.mockResolvedValue(existingUser);

      // Khi user đã tồn tại, hàm save sẽ được gọi với thông tin mới
      const updatedUser = { ...existingUser, ...keycloakUser };
      mockUserRepository.save.mockResolvedValue(updatedUser);

      const result = await service.upsertFromKeycloak(keycloakUser);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { sub: keycloakUser.sub } });
      expect(repository.create).not.toHaveBeenCalled(); // Không gọi create
      expect(repository.save).toHaveBeenCalledWith(expect.objectContaining(keycloakUser));
      expect(result.firstName).toEqual(keycloakUser.firstName);
    });
  });
});