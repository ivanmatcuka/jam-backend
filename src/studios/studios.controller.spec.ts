import { StudiosController } from './studios.controller';
import { StudiosService } from './studios.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('StudiosController', () => {
  let controller: StudiosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudiosController],
      providers: [StudiosService],
    }).compile();

    controller = module.get<StudiosController>(StudiosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
