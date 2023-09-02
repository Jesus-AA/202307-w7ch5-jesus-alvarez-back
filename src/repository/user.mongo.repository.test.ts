import { UserModel } from './user.mongo.model';
import { UserMongoRepository } from './user.mongo.repository';

jest.mock('./user.mongo.model');

describe('Given the class UserMongoRepository', () => {
  let repo: UserMongoRepository;
  beforeEach(() => {
    repo = new UserMongoRepository();
  });

  describe('When it is instantiated', () => {
    test('Then, when we use the getAll() method', async () => {
      const mockExec = jest.fn().mockResolvedValueOnce([]);
      UserModel.find = jest.fn().mockReturnValueOnce({
        exec: mockExec,
      });
      const result = await repo.getAll();
      expect(mockExec).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
    test('Then, when we use the getById() method', async () => {
      const mockExec = jest.fn().mockResolvedValueOnce([]);
      UserModel.findById = jest.fn().mockReturnValueOnce({
        exec: mockExec,
      });
      const result = await repo.getById('');
      expect(mockExec).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
    test('Then, when data isnt found with the getById() method', () => {
      const mockExec = jest.fn().mockResolvedValueOnce(null);
      UserModel.findById = jest.fn().mockReturnValueOnce({
        exec: mockExec,
      });
      expect(repo.getById('')).rejects.toThrow();
    });
    test('Then, when we use the create() method', async () => {
      const mockedUser = {
        userName: 'Kubo',
        password: '1234',
        firstName: 'Kubo',
        lastName: 'San',
        email: 'kubo@gmail.com',
        friends: [],
        enemies: [],
      };
      UserModel.create = jest.fn().mockReturnValueOnce(mockedUser);
      const result = await repo.create(mockedUser);
      expect(result).toEqual(mockedUser);
    });
    test('Then, when we use the search() method', async () => {
      const key = 'userName';
      const value = 'Kubo';
      const mockExec = jest.fn().mockResolvedValueOnce([{}]);
      UserModel.find = jest.fn().mockReturnValueOnce({
        exec: mockExec,
      });
      const result = await repo.search({ key, value });
      expect(mockExec).toHaveBeenCalled();
      expect(result).toHaveLength(1);
    });
    test('Then, when we use the update() method', async () => {
      const mockExec = jest.fn().mockReturnValueOnce([]);
      UserModel.findByIdAndUpdate = jest.fn().mockReturnValueOnce({
        exec: mockExec,
      });
      const mockUser = {
        id: '1',
        userName: 'Kubo',
      };
      const result = await repo.update('1', mockUser);
      expect(result).toEqual([]);
      expect(mockExec).toHaveBeenCalled();
    });
    test('Then, when data isnt found with the update() method', () => {
      const mockExec = jest.fn().mockResolvedValueOnce(null);
      UserModel.findByIdAndUpdate = jest.fn().mockReturnValueOnce({
        exec: mockExec,
      });
      expect(repo.update('', {})).rejects.toThrow();
    });
    test('Then, when we use the delete() method', async () => {
      const mockExec = jest.fn().mockReturnValueOnce({});
      UserModel.findByIdAndDelete = jest.fn().mockReturnValueOnce({
        exec: mockExec,
      });
      const mockUser = {
        id: '0',
      };
      const result = await repo.delete(mockUser.id);
      expect(result).toBe(undefined);
    });
    test('Then, when data isnt found with the delete() method', () => {
      const mockExec = jest.fn().mockReturnValueOnce(null);
      UserModel.findByIdAndDelete = jest.fn().mockReturnValueOnce({
        exec: mockExec,
      });
      expect(repo.delete('')).rejects.toThrow();
    });
  });
});
