import { UserGenresService } from './user-genres.service';
import { UserGenre } from './entities/user-genre.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

describe('UserGenresService', () => {
  let service: UserGenresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserGenresService,
        {
          provide: getRepositoryToken(UserGenre),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserGenresService>(UserGenresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
