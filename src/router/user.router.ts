import createDebug from 'debug';
import { Router as createRouter } from 'express';
import { UserController } from '../controller/users.controller.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { FilesInterceptor } from '../middleware/files.interceptor.js';
import { UserMongoRepository } from '../repository/user.mongo.repository.js';

const debug = createDebug('V25:Router: UserRouter');

debug('Loaded');
const authInterceptor = new AuthInterceptor();

const files = new FilesInterceptor();

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

userRouter.post(
  '/files',
  authInterceptor.authorization.bind(authInterceptor),
  files.singleFileStore('avatar'),
  (req, res, _Next) => {
    debug('final', req.body);
    debug(req.file);
    res.json(req.body);
  }
);
