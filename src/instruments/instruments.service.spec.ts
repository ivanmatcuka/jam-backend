import { Instrument } from './entities/instrument.entity';
import { InstrumentsService } from './instruments.service';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import {
  generateInstrument,
  generateInstruments,
} from './instruments.fixtures';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindManyOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { REQUEST } from '@nestjs/core';
import { ForbiddenException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Role } from 'src/users/role.enum';
import { JwtPayload } from 'src/auth/jwt.strategy';

describe('InstrumentsService', () => {
  let service: InstrumentsService;
  let repository: Repository<Instrument>;
  let request: Request & { user: JwtPayload };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstrumentsService,
        {
          provide: CaslAbilityFactory,
          useClass: CaslAbilityFactory,
        },
        {
          provide: REQUEST,
          useValue: {},
        },
        {
          provide: getRepositoryToken(Instrument),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<InstrumentsService>(InstrumentsService);
    repository = module.get<Repository<Instrument>>(
      getRepositoryToken(Instrument),
    );
    request = module.get(REQUEST);
  });

  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an instrument', () => {
      const createInstrumentDto: CreateInstrumentDto = {
        name: 'Guitar',
      };
      const fakeInstrument = generateInstrument(createInstrumentDto);

      jest.spyOn(repository, 'create').mockReturnValue(fakeInstrument);

      expect(service.create(createInstrumentDto)).toEqual(fakeInstrument);
      expect(repository.create).toHaveBeenCalledWith(createInstrumentDto);
    });
  });

  describe('findAll', () => {
    it('should return all instruments', () => {
      const fakeInstruments = generateInstruments(5);
      const options: FindManyOptions<Instrument> = {};

      jest.spyOn(repository, 'find').mockResolvedValue(fakeInstruments);

      expect(service.findAll(options)).resolves.toEqual(fakeInstruments);
      expect(repository.find).toHaveBeenCalledWith(options);
    });

    it('should throw an error if fails to return all instruments', () => {
      const error = new Error('Error finding instruments');
      const options: FindManyOptions<Instrument> = {};

      jest.spyOn(repository, 'find').mockRejectedValue(error);

      expect(service.findAll(options)).rejects.toThrow(error);
      expect(repository.find).toHaveBeenCalledWith(options);
    });
  });

  describe('findOne', () => {
    it('should return the instrument by search options', () => {
      const fakeInstrument = generateInstrument();
      const options: FindManyOptions<Instrument> = {};

      jest.spyOn(repository, 'findOne').mockResolvedValue(fakeInstrument);

      expect(service.findOne(options)).resolves.toEqual(fakeInstrument);
      expect(repository.findOne).toHaveBeenCalledWith(options);
    });

    it('should throw an error if fails to find the instument by search options', () => {
      const error = new Error('Error finding instruments');
      const options: FindManyOptions<Instrument> = {};

      jest.spyOn(repository, 'findOne').mockRejectedValue(error);

      expect(service.findOne(options)).rejects.toThrow(error);
      expect(repository.findOne).toHaveBeenCalledWith(options);
    });
  });

  describe('findById', () => {
    it('should find the instrument by ID', () => {
      const fakeInstrument = generateInstrument();

      jest.spyOn(repository, 'findOne').mockResolvedValue(fakeInstrument);

      expect(service.findById('id')).resolves.toEqual(fakeInstrument);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 'id' } });
    });

    it('should throw an error if fails to find the user by ID', () => {
      const error = new Error('Error finding the user');

      jest.spyOn(repository, 'findOne').mockRejectedValue(error);

      expect(service.findById('id')).rejects.toThrow(error);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 'id' } });
    });
  });

  describe('save', () => {
    it('should save a instrument', () => {
      const fakeInstrument = generateInstrument();
      request.user = {
        email: faker.internet.email(),
        sub: faker.datatype.uuid(),
        role: Role.Admin,
      };

      jest.spyOn(service, 'create').mockReturnValue(fakeInstrument);
      jest.spyOn(repository, 'save').mockResolvedValue(fakeInstrument);

      expect(service.save(fakeInstrument)).resolves.toEqual(fakeInstrument);
      expect(repository.save).toHaveBeenCalledWith(fakeInstrument);
    });

    it('should throw a ForbiddenException if user is not authorized', () => {
      const fakeInstrument = generateInstrument();
      request.user = {
        email: faker.internet.email(),
        sub: faker.datatype.uuid(),
        role: Role.User,
      };

      expect(() => service.save(fakeInstrument)).toThrow(ForbiddenException);
    });

    it('should throw an error if fails to save an instrument', () => {
      const error = new Error('Error saving an instrument');
      const fakeInstrument = generateInstrument();
      request.user = {
        email: faker.internet.email(),
        sub: faker.datatype.uuid(),
        role: Role.Admin,
      };

      jest.spyOn(service, 'create').mockReturnValue(fakeInstrument);
      jest.spyOn(repository, 'save').mockRejectedValue(error);

      expect(service.save(fakeInstrument)).rejects.toThrow(error);
      expect(repository.save).toHaveBeenCalledWith(fakeInstrument);
    });
  });

  describe('update', () => {
    it('should update the instrument', () => {
      const updateInstrumentDto: UpdateInstrumentDto = {};
      const updateResult: UpdateResult = { raw: {}, generatedMaps: [] };
      request.user = {
        email: faker.internet.email(),
        sub: faker.datatype.uuid(),
        role: Role.Admin,
      };

      jest.spyOn(repository, 'update').mockResolvedValue(updateResult);

      expect(service.update('id', updateInstrumentDto)).resolves.toEqual(
        updateResult,
      );
      expect(repository.update).toHaveBeenCalledWith('id', updateInstrumentDto);
    });

    it('should throw a ForbiddenException if user is not authorized', () => {
      const updateInstrumentDto: UpdateInstrumentDto = {};
      request.user = {
        email: faker.internet.email(),
        sub: faker.datatype.uuid(),
        role: Role.User,
      };

      expect(() => service.update('id', updateInstrumentDto)).toThrow(
        ForbiddenException,
      );
    });

    it('should throw an error if fails to update the instrument', () => {
      const error = new Error('Error updating the instrument');
      request.user = {
        email: faker.internet.email(),
        sub: faker.datatype.uuid(),
        role: Role.Admin,
      };

      jest.spyOn(repository, 'update').mockRejectedValue(error);

      expect(service.update('id', {})).rejects.toThrow(error);
      expect(repository.update).toHaveBeenCalledWith('id', {});
    });
  });

  describe('remove', () => {
    it('should delete the instrument', () => {
      const deleteResult: DeleteResult = { raw: {} };
      request.user = {
        email: faker.internet.email(),
        sub: faker.datatype.uuid(),
        role: Role.Admin,
      };

      jest.spyOn(repository, 'delete').mockResolvedValue(deleteResult);

      expect(service.remove('id')).resolves.toEqual(deleteResult);
      expect(repository.delete).toHaveBeenCalledWith('id');
    });

    it('should throw a ForbiddenException if user is not authorized', () => {
      request.user = {
        email: faker.internet.email(),
        sub: faker.datatype.uuid(),
        role: Role.User,
      };

      expect(() => service.remove('id')).toThrow(ForbiddenException);
    });

    it('should throw an error if fails to delete the instrument', () => {
      const error = new Error('Error deleting the instrument');
      request.user = {
        email: faker.internet.email(),
        sub: faker.datatype.uuid(),
        role: Role.Admin,
      };

      jest.spyOn(repository, 'delete').mockRejectedValue(error);

      expect(service.remove('id')).rejects.toThrow(error);
      expect(repository.delete).toHaveBeenCalledWith('id');
    });
  });
});
