import { Request, Response } from 'express';
import Task from '../Models/task.Model';
import paginationHelper from '../../../Helpers/pagination';
import searchHelper from '../../../Helpers/search';

export const index = async (req: Request, res: Response) => {
    const find: { 
        deleted: boolean, 
        status?: string,
        title?: RegExp
    } = { 
        deleted: false
    };
    //filter
    if (req.query.status) {
        find.status = req.query.status as string;
    }
    //sort
    const sort: Record<string, "asc" | "desc"> = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey as string] = (req.query.sortValue === 'asc' ? 'asc' : 'desc');
    }
    //search
    const objectSearch = searchHelper(req.query);

    if (req.query.keyword) {
        find.title = objectSearch.regex;
    }
    //pagination
    const initPagination = {
        currentPage: 1,
        limitItem: 4,
        totalPage: 1,
        skip: 0
    };
    const countTask = await Task.countDocuments(find);
    const objectPagination = paginationHelper(initPagination, req.query, countTask);
    
    const tasks = await Task
                        .find(find)
                        .sort(sort)
                        .limit(objectPagination.limitItem)
                        .skip(objectPagination.skip);
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

export const changeStatus = async (req: Request, res: Response) => {
    try {    
        const id: string = req.params.id;
        await Task.updateOne(
            { _id: id },
            { status: req.body.status }
        );

        res.json({
            code: 200,
            message: "change status successfully !",
        });
    } catch(error) {
        res.json({
            code: 400,
            message: "change status failed !"
        });
    }
}

export const changeMulti = async (req: Request, res: Response) => {
    try {
        enum Key {
            STATUS = "status",
            DELETE = "delete"
        }
        const ids: string[] = req.body.ids;
        const key: Key = req.body.key;
        const value: string = req.body.value;

        if (key === Key.STATUS) {
            await Task.updateMany(
                { _id: { $in: ids } },
                { status: value }
            );
        } else if (key === Key.DELETE) {
            await Task.updateMany(
                { _id: { $in: ids } },
                {
                    deleted: true,
                    deletedAt: new Date()
                }
            );
        }

        res.json({
            code: 200,
            message: "change status successfully !"
        });
    } catch(error) {
        res.json({
            code: 400, 
            message: "change status failed !"
        });
    }
}

export const createTask = async (req: Request, res: Response) => {
    try {
        const task = new Task(req.body);
        const data = await task.save();
        
        res.json({
            code: 200,
            message: "create successfully !",
            data: data
        });
    } catch(error) {
        res.json({
            code: 400, 
            message: "create failed !"
        });
    }
}

export const editTask = async (req: Request, res: Response) => {
    try {
        await Task.updateOne(
            { _id: req.params.id },
            req.body
        );
        
        res.json({
            code: 200,
            message: "edit successfully !",
        });
    } catch(error) {
        res.json({
            code: 400, 
            message: "edit failed !"
        });
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        await Task.updateOne(
            { _id: req.params.id },
            { 
                deleted: true,
                deletedAt: new Date()
            }
        );
        
        res.json({
            code: 200,
            message: "delete successfully !",
        });
    } catch(error) {
        res.json({
            code: 400, 
            message: "delete failed !"
        });
    }
}