import { Request, Response } from 'express';
import { Auth } from '../services/auth';
import { AuthInterceptor } from './auth.interceptor';
jest.mock('../services/auth.js');

describe('Given AuthInterceptor', () => {
  const interceptor = new AuthInterceptor();
  describe('When we instantiate it ', () => {
    test('authorization should be used without errors', () => {
      const mockRequest = {
        get: jest.fn().mockReturnValue('Bearer soy_el_token'),
        body: {},
      } as unknown as Request;
      const mockResponse = {} as Response;
      const mockNext = jest.fn();

      Auth.verifyJWTGettingPayload = jest.fn().mockReturnValue({
        id: '1',
      });

      interceptor.authorization(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith();
    });
    test('authorization should be used with errors', () => {
      const mockRequest = {
        get: jest.fn().mockReturnValue(''),
        body: {},
      } as unknown as Request;
      const mockResponse = {} as Response;
      const mockNext = jest.fn();

      Auth.verifyJWTGettingPayload = jest.fn().mockReturnValue({
        id: '1',
      });

      interceptor.authorization(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });
});
