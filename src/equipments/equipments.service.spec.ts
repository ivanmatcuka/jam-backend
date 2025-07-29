import { EquipmentsService } from './equipments.service';
import { Equipment } from './entities/equipment.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

describe('EquipmentsService', () => {
  let service: EquipmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EquipmentsService,
        {
          provide: getRepositoryToken(Equipment),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<EquipmentsService>(EquipmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
