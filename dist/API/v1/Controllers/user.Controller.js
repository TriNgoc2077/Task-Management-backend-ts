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
exports.listUser = exports.detailUser = exports.profile = exports.resetPassword = exports.otpPassword = exports.forgotPassword = exports.login = exports.register = void 0;
const user_Model_1 = __importDefault(require("../Models/user.Model"));
const generate_1 = require("../../../Helpers/generate");
const md5_1 = __importDefault(require("md5"));
const forgot_password_Model_1 = __importDefault(require("../Models/forgot-password.Model"));
const sendMail_1 = require("../../../Helpers/sendMail");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existUser = yield user_Model_1.default.findOne({ email: req.body.email, deleted: false });
        if (existUser) {
            throw new Error('User already exist !');
        }
        req.body.password = (0, md5_1.default)(req.body.password);
        const user = new user_Model_1.default({
            fullName: req.body.email,
            email: req.body.email,
            password: req.body.password,
            userToken: (0, generate_1.generateRandomString)(20),
        });
        yield user.save();
        const token = user.userToken;
        res.json({
            code: 200,
            message: "register successfully !",
            token: token
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: error.message,
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = (0, md5_1.default)(req.body.password);
        const user = yield user_Model_1.default.findOne({
            email: email,
            deleted: false
        });
        if (!user) {
            throw new Error('Email does not exist !');
        }
        if (password !== user.password) {
            throw new Error('Password is incorrect !');
        }
        const token = user.userToken;
        res.json({
            code: 200,
            message: "login successfully !",
            token: token
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: error.message,
        });
    }
});
exports.login = login;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const user = yield user_Model_1.default.findOne({ email: email, deleted: false }).select('fullName email');
        if (!user) {
            throw new Error('User does not exist !');
        }
        const otp = (0, generate_1.generateRandomNumber)(6);
        const objectForgotPassword = {
            email: email,
            otp: otp,
            expireAt: Date.now()
        };
        const recordForgotPassword = new forgot_password_Model_1.default(objectForgotPassword);
        yield recordForgotPassword.save();
        const subject = "Your OTP";
        (0, sendMail_1.sendMail)(email, subject, user, otp);
        res.json({
            code: 200,
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: error.message,
        });
    }
});
exports.forgotPassword = forgotPassword;
const otpPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const otp = req.body.otp;
        const record = yield forgot_password_Model_1.default.findOne({ email: email, otp: otp });
        if (!record) {
            throw new Error('OTP is invalid !');
        }
        const user = yield user_Model_1.default.findOne({ email: email, deleted: false });
        if (!user)
            throw new Error('Not found user');
        const token = user.userToken;
        res.json({
            code: 200,
            token: token
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: error.message,
        });
    }
});
exports.otpPassword = otpPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        const password = (0, md5_1.default)(req.body.password);
        const passwordConfirm = (0, md5_1.default)(req.body.passwordConfirm);
        const user = yield user_Model_1.default.findOne({ userToken: token });
        if (!user) {
            throw new Error('user does not exist !');
        }
        if (password !== passwordConfirm) {
            throw new Error('password or password confirm do not match !');
        }
        if (password === user.password) {
            throw new Error('new password cannot be the same as old password !');
        }
        yield user_Model_1.default.updateOne({ userToken: token }, { password: password });
        res.json({
            code: 200,
            token: user.userToken
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: error.message,
        });
    }
});
exports.resetPassword = resetPassword;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({
            code: 200,
            infor: req.user
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: error.message,
        });
    }
});
exports.profile = profile;
const detailUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_Model_1.default.findOne({ _id: req.params.id, deleted: false });
        if (!user) {
            throw new Error('User does not exist !');
        }
        res.json({
            code: 200,
            user: user
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: error.message,
        });
    }
});
exports.detailUser = detailUser;
const listUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_Model_1.default.find({ deleted: false }).select("fullName email");
        res.json({
            code: 200,
            users: users
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: error.message,
        });
    }
});
exports.listUser = listUser;
