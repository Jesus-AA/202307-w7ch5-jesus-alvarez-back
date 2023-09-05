import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HttpError } from '../types/http.error';
import { Auth } from './auth';

describe('Given the class Auth', () => {
  describe('When its methods are called,', () => {
    test('Then, the method hash()', async () => {
      const password = '1233';
      const hash = await bcrypt.hash(password, 10);
      expect(Auth.compare(password, hash)).resolves.toBe(true);
    });

    test('Then, if the password is incorrect, should throw an error', async () => {
      const password = '1233';
      const password2 = '1';
      const hash = await bcrypt.hash(password, 10);
      expect(Auth.compare(password2, hash)).resolves.toBe(false);
    });
    test.skip('Then, when verifyJWTGettingPayload is called', () => {
      const payload = { foo: 'bar' };
      const token = jwt.sign(payload, Auth.secret);
      const result = Auth.verifyJWTGettingPayload(token);
      expect(result).toEqual(expect.objectContaining(payload));
    });
    test('should throw an HttpError for an invalid token', () => {
      const token = 'invalidToken';
      expect(() => Auth.verifyJWTGettingPayload(token)).toThrow(HttpError);
    });
    test('should throw an HttpError if jwt.verify returns a string', () => {
      const token = 'invalidToken';
      jest
        .spyOn(jwt, 'verify')
        .mockReturnValueOnce('someString' as unknown as void);
      expect(() => Auth.verifyJWTGettingPayload(token)).toThrow(HttpError);
    });
  });
});
