import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { generateUser, generateUsers } from './users.fixtures';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { DeleteResult, UpdateResult } from 'typeorm';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('Controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', () => {
      const fakeUsers = generateUsers(5);

      jest.spyOn(service, 'findAll').mockResolvedValue(fakeUsers);

      expect(controller.findAll()).resolves.toEqual(fakeUsers);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should throw an error if fails to return all users', () => {
      const error = new Error('Error finding all users');

      jest.spyOn(service, 'findAll').mockRejectedValue(error);

      expect(controller.findAll()).rejects.toThrow(error);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return the user', () => {
      const fakeUser = generateUser();

      jest.spyOn(service, 'findById').mockResolvedValue(fakeUser);

      expect(controller.findOne('id')).resolves.toEqual(fakeUser);
      expect(service.findById).toHaveBeenCalledWith('id');
    });

    it('should throw an error if fails to find the user', () => {
      const error = new Error('Error finding the user');

      jest.spyOn(service, 'findById').mockRejectedValue(error);

      expect(controller.findOne('id')).rejects.toThrow(error);
      expect(service.findById).toHaveBeenCalledWith('id');
    });
  });

  describe('update', () => {
    it('should update the user', () => {
      const updateUserDto: UpdateUserDto = {};
      const updateResult: UpdateResult = { raw: {}, generatedMaps: [] };

      jest.spyOn(service, 'update').mockResolvedValue(updateResult);

      expect(controller.update('id', updateUserDto)).resolves.toEqual(
        updateResult,
      );
      expect(service.update).toHaveBeenCalledWith('id', updateUserDto);
    });

    it('should throw an error if fails to update the user', () => {
      const error = new Error('Error updating the user');
      const updateUserDto: UpdateUserDto = {};

      jest.spyOn(service, 'update').mockRejectedValue(error);

      expect(controller.update('id', updateUserDto)).rejects.toThrow(error);
      expect(service.update).toHaveBeenCalledWith('id', updateUserDto);
    });
  });

  describe('remove', () => {
    it('should remove the user', () => {
      const deleteResult: DeleteResult = { raw: {} };

      jest.spyOn(service, 'remove').mockResolvedValue(deleteResult);

      expect(controller.remove('id')).resolves.toEqual(deleteResult);
      expect(service.remove).toHaveBeenCalledWith('id');
    });

    it('should throw an error if fails to remove the user', () => {
      const error = new Error('Error removing the user');

      jest.spyOn(service, 'remove').mockRejectedValue(error);

      expect(controller.remove('id')).rejects.toThrow(error);
      expect(service.remove).toHaveBeenCalledWith('id');
    });
  });
});
