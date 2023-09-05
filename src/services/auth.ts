import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HttpError } from '../types/http.error.js';
import { TokenPayLoad } from '../types/token.js';

export class Auth {
  static secret = process.env.TOKEN_SECRET!;

  static hash(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  static compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static signJWT(payload: TokenPayLoad): string {
    const token = jwt.sign(payload, Auth.secret);
    return token;
  }

  static verifyJWTGettingPayload(token: string): TokenPayLoad {
    try {
      const result = jwt.verify(token, Auth.secret);
      if (typeof result === 'string') {
        throw new HttpError(498, 'Invalid Token', result);
      }

      return result as TokenPayLoad;
    } catch {
      throw new HttpError(498, 'Invalid Token');
    }
  }
}
