import { Express } from 'express';
import { taskRouters } from './task.Router';
import { userRouters } from './user.Router';
import { requireAuth } from '../middlewares/auth.middleware';
const mainV1Routers = (app: Express): void => {
    const version = '/api/v1';

    app.use(version + '/tasks', requireAuth, taskRouters);
    app.use(version + '/user', userRouters);

}

export default mainV1Routers;