import { Request, Response } from 'express';
import { UserMongoRepository } from '../repository/user.mongo.repository';
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
        body: mockedUser,
      } as Request;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();
      await userController.create(mockRequest, mockResponse, mockNext);
      expect(mockRepo.create).toHaveBeenCalled();
    });
    test('Then, we use the update() method', async () => {
      const mockedUser = {
        userName: 'Kubo',
        password: '1234',
        firstName: 'Kubo',
      };
      (mockRepo.update as jest.Mock).mockReturnValueOnce(mockedUser);
      const mockRequest = {
        params: { id: '1' },
        body: mockedUser,
      } as unknown as Request;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();
      await userController.update(mockRequest, mockResponse, mockNext);
      expect(mockRepo.update).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockedUser);
    });
    test('Then, when we use the delete() method', async () => {
      const mockedUser = {
        userName: 'Kubo',
        password: '1234',
        firstName: 'Kubo',
        id: '1',
      };
      (mockRepo.delete as jest.Mock).mockReturnValueOnce(mockedUser);
      const mockRequest = {
        params: { id: '1' },
      } as unknown as Request;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();
      await userController.delete(mockRequest, mockResponse, mockNext);
      expect(mockRepo.delete).toHaveBeenCalled();
    });
  });
});
