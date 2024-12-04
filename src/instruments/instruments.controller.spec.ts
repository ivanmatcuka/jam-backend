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
import { DeleteResult, UpdateResult } from 'typeorm';

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
    it('should return all instruments', () => {
      const fakeInstruments = generateInstruments(5);

      jest.spyOn(service, 'findAll').mockResolvedValue(fakeInstruments);

      expect(controller.findAll()).resolves.toEqual(fakeInstruments);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should throw an error if fails to return all instruments', () => {
      const error = new Error('Error finding all instruments');

      jest.spyOn(service, 'findAll').mockRejectedValue(error);

      expect(controller.findAll()).rejects.toThrow(error);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return the instrument', () => {
      const fakeInstrument = generateInstrument();

      jest.spyOn(service, 'findById').mockResolvedValue(fakeInstrument);

      expect(controller.findOne('id')).resolves.toEqual(fakeInstrument);
      expect(service.findById).toHaveBeenCalledWith('id');
    });

    it('should throw an error if fails to find the instrument', () => {
      const error = new Error('Error finding the instrument');

      jest.spyOn(service, 'findById').mockRejectedValue(error);

      expect(controller.findOne('id')).rejects.toThrow(error);
      expect(service.findById).toHaveBeenCalledWith('id');
    });
  });

  describe('update', () => {
    it('should update the instrument', () => {
      const updateInstrumentDto = {};
      const updateResult: UpdateResult = { raw: {}, generatedMaps: [] };

      jest.spyOn(service, 'update').mockResolvedValue(updateResult);

      expect(controller.update('id', updateInstrumentDto)).resolves.toEqual(
        updateResult,
      );
      expect(service.update).toHaveBeenCalledWith('id', updateInstrumentDto);
    });

    it('should handle errors when updating the instrument', () => {
      const error = new Error('Error updating the instrument');

      jest.spyOn(service, 'update').mockRejectedValue(error);

      expect(controller.update('id', {})).rejects.toThrow(error);
      expect(service.update).toHaveBeenCalledWith('id', {});
    });
  });

  describe('remove', () => {
    it('should delete the instrument', () => {
      const deleteResult: DeleteResult = { raw: {} };

      jest.spyOn(service, 'remove').mockResolvedValue(deleteResult);

      expect(controller.remove('id')).resolves.toEqual(deleteResult);
      expect(service.remove).toHaveBeenCalledWith('id');
    });

    it('should handle errors when deleting the instrument', () => {
      const error = new Error('Error deleting the instrument');

      jest.spyOn(service, 'remove').mockRejectedValue(error);

      expect(controller.remove('id')).rejects.toThrow(error);
      expect(service.remove).toHaveBeenCalledWith('id');
    });
  });
});
