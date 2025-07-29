import { EquipmentsController } from './equipments.controller';
import { EquipmentsService } from './equipments.service';
import { Equipment } from './entities/equipment.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EquipmentType } from 'src/equipment-types/entities/equipment-type.entity';
import { EquipmentTypesService } from 'src/equipment-types/equipment-types.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { Room } from 'src/rooms/entities/room.entity';
import { StudiosService } from 'src/studios/studios.service';
import { Studio } from 'src/studios/entities/studio.entity';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';

describe('EquipmentsController', () => {
  let controller: EquipmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipmentsController],
      providers: [
        EquipmentsService,
        EquipmentTypesService,
        RoomsService,
        StudiosService,
        {
          provide: getRepositoryToken(Equipment),
          useValue: {},
        },
        {
          provide: getRepositoryToken(EquipmentType),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Room),
          useValue: {},
        },
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

    controller = module.get<EquipmentsController>(EquipmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
