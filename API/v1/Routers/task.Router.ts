import { Router, Request, Response } from 'express';
import Task from '../Models/task.Model';

import * as controller from '../Controllers/task.Controller';

const router: Router = Router();


router.get('/', controller.index);

router.get('/detail/:id', controller.detail);

router.patch('/change-status/:id', controller.changeStatus);
router.patch('/change-multi', controller.changeMulti);
// router.post('/create', controller.create);
// router.patch('/edit/:id', controller.edit);
// router.delete('/delete/:id', controller.delete);

export const taskRouters: Router = router;