import { Request, Response } from 'express';
import { UserMongoRepository } from '../repository/user.mongo.repository';
import { Auth } from '../services/auth';
import { UserController } from './users.controller';

describe('Given the class UserController', () => {
  describe('When it is instantiated', () => {
    const mockRepo: UserMongoRepository = {
      getAll: jest.fn(),
      getById: jest.fn(),
      create: jest.fn(),
      search: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    const userController = new UserController(mockRepo);

    test('Then, we use the getAll() method ', async () => {
      const mockData = [{ id: '1', name: 'Kubo' }];
      (mockRepo.getAll as jest.Mock).mockResolvedValueOnce(mockData);
      const mockRequest = {} as Request;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();

      await userController.getAll(mockRequest, mockResponse, mockNext);
      expect(mockRepo.getAll).toHaveBeenCalledWith();
      expect(mockResponse.json).toHaveBeenCalledWith(mockData);
    });
    test('Then, we use the getById() method ', async () => {
      const mockData = [{ id: '1', name: 'Kubo' }];
      (mockRepo.getById as jest.Mock).mockResolvedValueOnce(mockData);
      const mockRequest = {
        params: { id: '01' },
      } as unknown as Request;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();
      await userController.getById(mockRequest, mockResponse, mockNext);
      expect(mockRepo.getById).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockData);
    });
    test('Then, we use the create() method', async () => {
      const mockedUser = {
        userName: 'Kubo',
        password: '1234',
        firstName: 'Kubo',
        lastName: 'San',
        email: 'kubo@gmail.com',
        friends: [],
        enemies: [],
      };
      (mockRepo.create as jest.Mock).mockReturnValueOnce(mockedUser);
      const mockRequest = {
        params: '1',
        body: {
          password: '12345',
        },
      } as unknown as Request;
      const mockResponse = {
        json: jest.fn(),
        status: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();
      await userController.create(mockRequest, mockResponse, mockNext);
      expect(mockRepo.create).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockedUser);
    });
    test('Then, we use the update() method', async () => {
      const mockedUser = {
        userName: 'Kubo',
        password: '1234',
        firstName: 'Kubo',
      };

      const mockRequest = {
        params: { id: '1' },
        body: mockedUser,
      } as unknown as Request;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();

      (mockRepo.update as jest.Mock).mockReturnValueOnce(mockedUser);
      await userController.update(mockRequest, mockResponse, mockNext);
      expect(mockRepo.update).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockedUser);
    });
    test('Then, when we use the delete() method', async () => {
      const mockedUser = {
        userName: 'Kubo',
        password: '12345',
        firstName: 'Kubo',
        lastName: 'San',
        email: 'kubo@gmail.com',
        friends: [],
        enemies: [],
        id: '1',
      };
      (mockRepo.delete as jest.Mock).mockReturnValueOnce(mockedUser);
      const mockRequest = {
        params: { id: '1' },
        body: {
          password: '12345',
        },
      } as unknown as Request;
      const mockResponse = {
        json: jest.fn(),
        status: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();
      await userController.delete(mockRequest, mockResponse, mockNext);
      expect(mockRepo.delete).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalled();
    });
    test('Then, we use the login() method', async () => {
      const mockedUser = {
        userName: 'Kubo',
        password: '1234',
      };
      const mockRequest = {
        params: { id: '1' },
        body: mockedUser,
      } as unknown as any;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();
      (mockRepo.search as jest.Mock).mockResolvedValue([mockedUser]);
      Auth.compare = jest.fn().mockReturnValue(true);
      await userController.login(mockRequest, mockResponse, mockNext);
      expect(mockRepo.search).toHaveBeenCalled();
    });
  });
  describe('When there are errors calling methods', () => {
    const mockRepo: UserMongoRepository = {
      getAll: jest.fn().mockRejectedValueOnce(new Error('GetAll Error')),
      getById: jest.fn().mockRejectedValueOnce(new Error('GetById Error')),
      create: jest.fn().mockRejectedValueOnce(new Error('Create Error')),
      search: jest.fn().mockRejectedValueOnce(new Error('Search Error')),
      update: jest.fn().mockRejectedValueOnce(new Error('Update Error')),
      delete: jest.fn().mockRejectedValueOnce(new Error('Delete Error')),
    } as unknown as UserMongoRepository;
    const userController = new UserController(mockRepo);
    test('Then, when we call getAll(), we should have an error', async () => {
      const mockRequest = {} as Request;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();
      await userController.getAll(mockRequest, mockResponse, mockNext);
      expect(mockRepo.getAll).toBeCalledWith();
      expect(mockNext).toHaveBeenCalledWith(new Error('GetAll Error'));
    });
    test('Then, when we call getById(), we should have an error', async () => {
      const mockRequest = {
        params: { id: '01' },
      } as unknown as Request;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();
      await userController.getById(mockRequest, mockResponse, mockNext);
      expect(mockRepo.getById).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(new Error('GetById Error'));
    });
    test('Then, when we call create(), we should have an error', async () => {
      const mockRequest = {
        body: {
          userName: 'Kubo',
          password: '1234',
          firstName: 'Kubo',
          lastName: 'San',
          email: 'kubo@gmail.com',
          friends: [],
          enemies: [],
        },
      } as Request;
      const mockResponse = {
        json: jest.fn(),
        status: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();
      await userController.create(mockRequest, mockResponse, mockNext);
      expect(mockRepo.create).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(new Error('Create Error'));
    });
    test('Then, when we call update(), we should have an error', async () => {
      const mockRequest = {
        params: { id: 'someUserId' },
        body: {
          userName: 'Kubo',
        },
      } as unknown as Request;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();
      await userController.update(mockRequest, mockResponse, mockNext);
      expect(mockRepo.update).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(new Error('Update Error'));
    });
    test('Then, when we call delete(), we should have an error', async () => {
      const mockRequest = {
        params: { id: '1' },
      } as unknown as Request;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();
      await userController.delete(mockRequest, mockResponse, mockNext);
      expect(mockRepo.delete).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(new Error('Delete Error'));
    });
    test('Then, when we call login(), we should have an error', async () => {
      const mockRequest = {
        params: '1',
        body: { password: '123' },
      } as unknown as Request;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();
      await userController.login(mockRequest, mockResponse, mockNext);
      expect(mockRepo.search).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(new Error('Search Error'));
    });
  });
});
