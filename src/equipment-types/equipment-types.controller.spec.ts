import { EquipmentTypesController } from './equipment-types.controller';
import { EquipmentTypesService } from './equipment-types.service';
import { EquipmentType } from './entities/equipment-type.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('EquipmentTypesController', () => {
  let controller: EquipmentTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipmentTypesController],
      providers: [
        EquipmentTypesService,
        {
          provide: getRepositoryToken(EquipmentType),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<EquipmentTypesController>(EquipmentTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
