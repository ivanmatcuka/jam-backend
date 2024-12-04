import { EquipmentsService } from './equipments.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('EquipmentsService', () => {
  let service: EquipmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipmentsService],
    }).compile();

    service = module.get<EquipmentsService>(EquipmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
