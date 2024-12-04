import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { generateUser, generateUsers } from './users.fixtures';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindManyOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { faker } from '@faker-js/faker';
import { Country } from 'src/enums/countries.enum';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', () => {
      const createUserDto: CreateUserDto = {
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        country: faker.helpers.arrayElement(Object.values(Country)),
        city: 'Oslo',
        password: faker.internet.password(),
      };
      const fakeUser = generateUser(createUserDto);

      jest.spyOn(repository, 'create').mockReturnValue(fakeUser);

      expect(service.create(createUserDto)).toEqual(fakeUser);
      expect(repository.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('save', () => {
    it('should save a user', () => {
      const fakeUser = generateUser();

      jest.spyOn(repository, 'save').mockResolvedValue(fakeUser);

      expect(service.save(fakeUser)).resolves.toEqual(fakeUser);
      expect(repository.save).toHaveBeenCalledWith(fakeUser);
    });

    it('should throw an error if fails to save a user', () => {
      const error = new Error('Error saving a user');
      const fakeUser = generateUser();

      jest.spyOn(repository, 'save').mockRejectedValue(error);

      expect(service.save(fakeUser)).rejects.toThrow(error);
      expect(repository.save).toHaveBeenCalledWith(fakeUser);
    });
  });

  describe('findAll', () => {
    it('should return all users', () => {
      const fakeUsers = generateUsers(5);
      const options: FindManyOptions<User> = {};

      jest.spyOn(repository, 'find').mockResolvedValue(fakeUsers);

      expect(service.findAll(options)).resolves.toEqual(fakeUsers);
      expect(repository.find).toHaveBeenCalledWith(options);
    });

    it('should throw an error if fails to return all users', () => {
      const error = new Error('Error finding users');
      const options: FindManyOptions<User> = {};

      jest.spyOn(repository, 'find').mockRejectedValue(error);

      expect(service.findAll(options)).rejects.toThrow(error);
      expect(repository.find).toHaveBeenCalledWith(options);
    });
  });

  describe('findOne', () => {
    it('should find the user by search options', () => {
      const fakeUser = generateUser();
      const options: FindManyOptions<User> = {};

      jest.spyOn(repository, 'findOne').mockResolvedValue(fakeUser);

      expect(service.findOne(options)).resolves.toEqual(fakeUser);
      expect(repository.findOne).toHaveBeenCalledWith(options);
    });

    it('should throw an error if fails to find the user by search options', () => {
      const error = new Error('Error finding the user');
      const options: FindManyOptions<User> = {};

      jest.spyOn(repository, 'findOne').mockRejectedValue(error);

      expect(service.findOne(options)).rejects.toThrow(error);
      expect(repository.findOne).toHaveBeenCalledWith(options);
    });
  });

  describe('findById', () => {
    it('should find the user by ID', () => {
      const fakeUser = generateUser();

      jest.spyOn(repository, 'findOne').mockResolvedValue(fakeUser);

      expect(service.findById('id')).resolves.toEqual(fakeUser);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 'id' } });
    });

    it('should throw an error if fails to find the user by ID', () => {
      const error = new Error('Error finding the user');

      jest.spyOn(repository, 'findOne').mockRejectedValue(error);

      expect(service.findById('id')).rejects.toThrow(error);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 'id' } });
    });
  });

  describe('update', () => {
    it('should update the user', () => {
      const updateUserDto: UpdateUserDto = {};
      const updateResult: UpdateResult = { raw: {}, generatedMaps: [] };

      jest.spyOn(repository, 'update').mockResolvedValue(updateResult);

      expect(service.update('id', updateUserDto)).resolves.toEqual(
        updateResult,
      );
      expect(repository.update).toHaveBeenCalledWith('id', updateUserDto);
    });

    it('should throw an error if fails to update the user', () => {
      const error = new Error('Error updating the user');
      const updateUserDto: UpdateUserDto = {};

      jest.spyOn(repository, 'update').mockRejectedValue(error);

      expect(service.update('id', updateUserDto)).rejects.toThrow(error);
      expect(repository.update).toHaveBeenCalledWith('id', updateUserDto);
    });
  });

  describe('remove', () => {
    it('should remove the user', () => {
      const deleteResult: DeleteResult = { raw: {} };

      jest.spyOn(repository, 'delete').mockResolvedValue(deleteResult);

      expect(service.remove('id')).resolves.toEqual(deleteResult);
      expect(repository.delete).toHaveBeenCalledWith('id');
    });

    it('should throw an error if fails to remove the user', () => {
      const error = new Error('Error removing the user');

      jest.spyOn(repository, 'delete').mockRejectedValue(error);

      expect(service.remove('id')).rejects.toThrow(error);
      expect(repository.delete).toHaveBeenCalledWith('id');
    });
  });
});
