import express, { Express } from 'express';
import * as database from './Config/database';
import dotenv from 'dotenv';
import mainV1Routers from './API/v1/Routers/index.Router';

dotenv.config();

database.connect();

const app: Express = express();
const port: Number | String = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mainV1Routers(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})