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
exports.requireAuth = void 0;
const user_Model_1 = __importDefault(require("../Models/user.Model"));
const requireAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.headers.authorization) {
            const userToken = req.headers.authorization.split(' ')[1];
            const user = yield user_Model_1.default.findOne({ userToken: userToken, deleted: false }).select("-password -userToken");
            if (!user) {
                throw new Error('invalid token !');
            }
            req["user"] = user;
            next();
        }
        else {
            throw new Error('Token does not exist !');
        }
    }
    catch (error) {
        res.json({
            code: 400,
            message: error.message
        });
    }
});
exports.requireAuth = requireAuth;
