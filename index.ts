import express, { Express, Request, Response } from 'express';
import * as database from './Config/database';
import dotenv from 'dotenv';
import Task from './Models/task.Model';

dotenv.config();

database.connect();

const app: Express = express();
const port: Number | String = process.env.PORT || 3001;

app.get('/tasks', async (req: Request, res: Response) => {
    const tasks = await Task.find({ deleted: false });
    res.json({
        code: 200,
        message: 'list tasks',
        tasks: tasks
    });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})