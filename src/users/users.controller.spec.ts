import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { generateUser, generateUsers } from './users.fixtures';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

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
    it('should return an array of users', () => {
      const fakeUsers = generateUsers(5);

      const mockFindAll = jest.fn();
      mockFindAll.mockReturnValue(Promise.resolve(fakeUsers));

      jest.spyOn(service, 'findAll').mockImplementation(mockFindAll);

      expect(controller.findAll()).resolves.toEqual(fakeUsers);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should handle errors when finding all users', async () => {
      const error = new Error('Error finding all users');

      const mockFindAll = jest.fn();
      mockFindAll.mockReturnValue(Promise.reject(error));

      jest.spyOn(service, 'findAll').mockImplementation(mockFindAll);

      expect(controller.findAll()).rejects.toThrow(error);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    const fakeUser = generateUser();
    const { id } = fakeUser;

    it('should return a user', () => {
      const mockFindById = jest.fn();
      mockFindById.mockReturnValue(Promise.resolve(fakeUser));

      jest.spyOn(service, 'findById').mockImplementation(mockFindById);

      expect(controller.findOne(id)).resolves.toEqual(fakeUser);
      expect(service.findById).toHaveBeenCalledWith(id);
    });

    it('should handle errors when finding the user', async () => {
      const error = new Error('Error finding the user');

      const mockFindById = jest.fn();
      mockFindById.mockReturnValue(Promise.reject(error));

      jest.spyOn(service, 'findById').mockImplementation(mockFindById);

      expect(controller.findOne(id)).rejects.toThrow(error);
      expect(service.findById).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    const fakeUser = generateUser();
    const { id } = fakeUser;

    it('should update the user', () => {
      const updateUserDto: UpdateUserDto = {
        email: 'ivan@gmail.com',
        firstName: 'Ivan',
        country: 'Germany',
        city: 'Berlin',
      };
      const expectedResult = { ...fakeUser, ...updateUserDto };

      const mockUpdate = jest.fn();
      mockUpdate.mockReturnValue(Promise.resolve(expectedResult));

      jest.spyOn(service, 'update').mockImplementation(mockUpdate);

      expect(controller.update(id, updateUserDto)).resolves.toEqual(
        expectedResult,
      );
      expect(service.update).toHaveBeenCalledWith(id, updateUserDto);
    });

    it('should handle errors when updating the user', async () => {
      const error = new Error('Error updating the user');

      const mockUpdate = jest.fn();
      mockUpdate.mockReturnValue(Promise.reject(error));

      jest.spyOn(service, 'update').mockImplementation(mockUpdate);

      expect(controller.update(id, {})).rejects.toThrow(error);
      expect(service.update).toHaveBeenCalledWith(id, {});
    });
  });

  describe('remove', () => {
    const fakeUser = generateUser();
    const { id } = fakeUser;

    it('should remove the user', () => {
      const deleteResult = { affected: 1, raw: [{ affected: 1 }] };

      const mockDelete = jest.fn();
      mockDelete.mockReturnValue(Promise.resolve(deleteResult));

      jest.spyOn(service, 'remove').mockImplementation(mockDelete);

      expect(controller.remove(id)).resolves.toEqual(deleteResult);
      expect(service.remove).toHaveBeenCalledWith(id);
    });

    it('should handle errors when removing the user', async () => {
      const error = new Error('Error removing the user');

      const mockDelete = jest.fn();
      mockDelete.mockReturnValue(Promise.reject(error));

      jest.spyOn(service, 'remove').mockImplementation(mockDelete);

      expect(controller.remove(id)).rejects.toThrow(error);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
