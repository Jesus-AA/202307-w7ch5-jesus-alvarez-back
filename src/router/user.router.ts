import createDebug from 'debug';
import { Router as createRouter } from 'express';
import { UserController } from '../controller/users.controller.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { UserMongoRepository } from '../repository/user.mongo.repository.js';

const debug = createDebug('V25:Router: UserRouter');

debug('Loaded');
const authInterceptor = new AuthInterceptor();

const repo = new UserMongoRepository();
const userController = new UserController(repo);
export const userRouter = createRouter();

userRouter.patch('/login', userController.login.bind(userController));
userRouter.post('/register', userController.create.bind(userController));

userRouter.get(
  '/',
  authInterceptor.authorization.bind(authInterceptor),
  userController.getAll.bind(userController)
);
userRouter.get(
  '/:id',
  authInterceptor.authorization.bind(authInterceptor),
  userController.getById.bind(userController)
);

userRouter.patch(
  '/:id',
  authInterceptor.authorization.bind(authInterceptor),
  userController.update.bind(userController)
);
userRouter.delete(
  '/:id',
  authInterceptor.authorization.bind(authInterceptor),
  userController.delete.bind(userController)
);
