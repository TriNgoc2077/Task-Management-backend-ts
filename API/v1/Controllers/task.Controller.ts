import { Request, Response } from "express";
import Task from "../Models/task.Model";

export const index = async (req: Request, res: Response) => {
    const find: { deleted: boolean, status?: string } = { 
        deleted: false
    };
    
    if (req.query.status) {
        find.status = req.query.status as string;
    }
    
    const tasks = await Task.find(find);
    res.json({
        code: 200,
        message: 'list tasks',
        tasks: tasks
    });
}

export const detail = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    const task = await Task.findOne({ _id: id, deleted: false });
    res.json({
        code: 200,
        message: 'detail task',
        task: task
    });
}