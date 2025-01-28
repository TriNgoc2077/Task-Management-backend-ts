"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.editTask = exports.createTask = exports.changeMulti = exports.changeStatus = exports.detail = exports.index = void 0;
const task_Model_1 = __importDefault(require("../Models/task.Model"));
const pagination_1 = __importDefault(require("../../../Helpers/pagination"));
const search_1 = __importDefault(require("../../../Helpers/search"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        deleted: false
    };
    if (req.query.status) {
        find.status = req.query.status;
    }
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = (req.query.sortValue === 'asc' ? 'asc' : 'desc');
    }
    const objectSearch = (0, search_1.default)(req.query);
    if (req.query.keyword) {
        find.title = objectSearch.regex;
    }
    const initPagination = {
        currentPage: 1,
        limitItem: 4,
        totalPage: 1,
        skip: 0
    };
    const countTask = yield task_Model_1.default.countDocuments(find);
    const objectPagination = (0, pagination_1.default)(initPagination, req.query, countTask);
    const tasks = yield task_Model_1.default
        .find(find)
        .sort(sort)
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip);
    res.json({
        code: 200,
        message: 'list tasks',
        tasks: tasks
    });
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const task = yield task_Model_1.default.findOne({ _id: id, deleted: false });
    res.json({
        code: 200,
        message: 'detail task',
        task: task
    });
});
exports.detail = detail;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield task_Model_1.default.updateOne({ _id: id }, { status: req.body.status });
        res.json({
            code: 200,
            message: "change status successfully !",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "change status failed !"
        });
    }
});
exports.changeStatus = changeStatus;
const changeMulti = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let Key;
        (function (Key) {
            Key["STATUS"] = "status";
            Key["DELETE"] = "delete";
        })(Key || (Key = {}));
        const ids = req.body.ids;
        const key = req.body.key;
        const value = req.body.value;
        if (key === Key.STATUS) {
            yield task_Model_1.default.updateMany({ _id: { $in: ids } }, { status: value });
        }
        else if (key === Key.DELETE) {
            yield task_Model_1.default.updateMany({ _id: { $in: ids } }, {
                deleted: true,
                deletedAt: new Date()
            });
        }
        res.json({
            code: 200,
            message: "change status successfully !"
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "change status failed !"
        });
    }
});
exports.changeMulti = changeMulti;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = new task_Model_1.default(req.body);
        const data = yield task.save();
        res.json({
            code: 200,
            message: "create successfully !",
            data: data
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "create failed !"
        });
    }
});
exports.createTask = createTask;
const editTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield task_Model_1.default.updateOne({ _id: req.params.id }, req.body);
        res.json({
            code: 200,
            message: "edit successfully !",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "edit failed !"
        });
    }
});
exports.editTask = editTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield task_Model_1.default.updateOne({ _id: req.params.id }, {
            deleted: true,
            deletedAt: new Date()
        });
        res.json({
            code: 200,
            message: "delete successfully !",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "delete failed !"
        });
    }
});
exports.deleteTask = deleteTask;
