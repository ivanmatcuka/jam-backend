import { UserGenresController } from './user-genres.controller';
import { UserGenresService } from './user-genres.service';
import { UserGenre } from './entities/user-genre.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('UserGenresController', () => {
  let controller: UserGenresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserGenresController],
      providers: [
        UserGenresService,
        {
          provide: getRepositoryToken(UserGenre),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<UserGenresController>(UserGenresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
