import createDebug from 'debug';
import { Router as createRouter } from 'express';
import { UserController } from '../controller/users.controller.js';
import { UserMongoRepository } from '../repository/user.mongo.repository.js';

const debug = createDebug('V25:Router: UserRouter');

debug('Loaded');

const repo = new UserMongoRepository();
const userController = new UserController(repo);
export const userRouter = createRouter();

userRouter.patch('/login', userController.login.bind(userController));
userRouter.post('/register', userController.create.bind(userController));

userRouter.get('/', userController.getAll.bind(userController));
userRouter.get('/:id', userController.getById.bind(userController));

userRouter.patch('/:id', userController.update.bind(userController));
userRouter.delete('/:id', userController.delete.bind(userController));
