import { StudiosService } from './studios.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('StudiosService', () => {
  let service: StudiosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudiosService],
    }).compile();

    service = module.get<StudiosService>(StudiosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
