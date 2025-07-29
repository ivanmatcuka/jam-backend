import { StudiosService } from './studios.service';
import { Studio } from './entities/studio.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { REQUEST } from '@nestjs/core';

describe('StudiosService', () => {
  let service: StudiosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudiosService,
        {
          provide: REQUEST,
          useValue: {},
        },
        {
          provide: getRepositoryToken(Studio),
          useClass: Repository,
        },
        {
          provide: CaslAbilityFactory,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<StudiosService>(StudiosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
