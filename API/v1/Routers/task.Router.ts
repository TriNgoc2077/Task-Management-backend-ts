import { Router, Request, Response } from 'express';
import Task from '../../../Models/task.Model';
const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    const tasks = await Task.find({ deleted: false });
    res.json({
        code: 200,
        message: 'list tasks',
        tasks: tasks
    });
});

router.get('/detail/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id;

    const task = await Task.findOne({ _id: id, deleted: false });
    res.json({
        code: 200,
        message: 'detail task',
        task: task
    });
});

// router.patch('/change-status/:id', controller.changeStatus);
// router.patch('/change-multi', controller.changeMulti);
// router.post('/create', controller.create);
// router.patch('/edit/:id', controller.edit);
// router.delete('/delete/:id', controller.delete);

export const taskRouters: Router = router;