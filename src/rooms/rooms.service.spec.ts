import { RoomsService } from './rooms.service';
import { Room } from './entities/room.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { StudiosService } from 'src/studios/studios.service';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { Studio } from 'src/studios/entities/studio.entity';

describe('RoomsService', () => {
  let service: RoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsService,
        {
          provide: REQUEST,
          useValue: {},
        },
        {
          provide: getRepositoryToken(Room),
          useClass: Repository,
        },
        StudiosService,
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

    service = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
