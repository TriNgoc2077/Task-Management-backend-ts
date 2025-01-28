"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_Router_1 = require("./task.Router");
const user_Router_1 = require("./user.Router");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const mainV1Routers = (app) => {
    const version = '/api/v1';
    app.use(version + '/tasks', auth_middleware_1.requireAuth, task_Router_1.taskRouters);
    app.use(version + '/user', user_Router_1.userRouters);
};
exports.default = mainV1Routers;
