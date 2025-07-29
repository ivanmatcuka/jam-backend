import { StudiosController } from './studios.controller';
import { StudiosService } from './studios.service';
import { Studio } from './entities/studio.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';

describe('StudiosController', () => {
  let controller: StudiosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudiosController],
      providers: [
        StudiosService,
        {
          provide: getRepositoryToken(Studio),
          useValue: {},
        },
        {
          provide: CaslAbilityFactory,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<StudiosController>(StudiosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
