import { JwtPayload } from 'jsonwebtoken';

export type TokenPayLoad = JwtPayload & {
  id: string;
  userName: string;
};
