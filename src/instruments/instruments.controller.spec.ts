// import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import { Instrument } from './entities/instrument.entity';
import { InstrumentsController } from './instruments.controller';
import { InstrumentsService } from './instruments.service';
import {
  generateInstrument,
  generateInstruments,
} from './instruments.fixtures';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { REQUEST } from '@nestjs/core';

describe('InstrumentsController', () => {
  let controller: InstrumentsController;
  let service: InstrumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstrumentsController],
      providers: [
        InstrumentsService,
        {
          provide: REQUEST,
          useValue: {},
        },
        {
          provide: getRepositoryToken(Instrument),
          useValue: {},
        },
        {
          provide: CaslAbilityFactory,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<InstrumentsController>(InstrumentsController);
    service = module.get<InstrumentsService>(InstrumentsService);
  });

  it('Controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of instruments', () => {
      const fakeInstruments = generateInstruments(5);

      const mockFindAll = jest.fn();
      mockFindAll.mockReturnValue(Promise.resolve(fakeInstruments));

      jest.spyOn(service, 'findAll').mockImplementation(mockFindAll);

      expect(controller.findAll()).resolves.toEqual(fakeInstruments);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should handle errors when finding all instruments', () => {
      const error = new Error('Error finding all instruments');

      const mockFindAll = jest.fn();
      mockFindAll.mockReturnValue(Promise.reject(error));

      jest.spyOn(service, 'findAll').mockImplementation(mockFindAll);

      expect(controller.findAll()).rejects.toThrow(error);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    const fakeInstrument = generateInstrument();
    const { id } = fakeInstrument;

    it('should return an instrument', () => {
      const mockFindById = jest.fn();
      mockFindById.mockReturnValue(Promise.resolve(fakeInstrument));

      jest.spyOn(service, 'findById').mockImplementation(mockFindById);

      expect(controller.findOne(id)).resolves.toEqual(fakeInstrument);
      expect(service.findById).toHaveBeenCalledWith(id);
    });

    it('should handle errors when finding an instrument', () => {
      const error = new Error('Error finding an instrument');

      const mockFindById = jest.fn();
      mockFindById.mockReturnValue(Promise.reject(error));

      jest.spyOn(service, 'findById').mockImplementation(mockFindById);

      expect(controller.findOne(id)).rejects.toThrow(error);
      expect(service.findById).toHaveBeenCalledWith(id);
    });
  });
});
