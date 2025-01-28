import { Router } from 'express';

import * as controller from '../Controllers/task.Controller';

const router: Router = Router();


router.get('/', controller.index);

router.get('/detail/:id', controller.detail);

router.patch('/change-status/:id', controller.changeStatus);
router.patch('/change-multi', controller.changeMulti);
router.post('/create', controller.createTask);
router.patch('/edit/:id', controller.editTask);
router.delete('/delete/:id', controller.deleteTask);

export const taskRouters: Router = router;