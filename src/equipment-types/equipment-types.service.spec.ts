import { EquipmentTypesService } from './equipment-types.service';
import { EquipmentType } from './entities/equipment-type.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

describe('EquipmentTypesService', () => {
  let service: EquipmentTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EquipmentTypesService,
        {
          provide: getRepositoryToken(EquipmentType),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<EquipmentTypesService>(EquipmentTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
