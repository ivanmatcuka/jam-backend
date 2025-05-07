import { EquipmentTypesService } from './equipment-types.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('EquipmentTypesService', () => {
  let service: EquipmentTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipmentTypesService],
    }).compile();

    service = module.get<EquipmentTypesService>(EquipmentTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
