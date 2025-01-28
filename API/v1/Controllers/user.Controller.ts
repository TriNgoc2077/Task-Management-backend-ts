import { Request, Response } from 'express';
import User from '../Models/user.Model';
import { generateRandomString, generateRandomNumber } from '../../../Helpers/generate';
import md5 from "md5";
import ForgotPassword from '../Models/forgot-password.Model';
import { sendMail } from '../../../Helpers/sendMail';
// [POST] api/v1/user/register
export const register = async (req: Request, res: Response) => {
    try {
        const existUser = await User.findOne({ email: req.body.email, deleted: false });
        if (existUser) {
            throw new Error('User already exist !');
        }
        req.body.password = md5(req.body.password);
        const user = new User({
            fullName: req.body.email,
            email: req.body.email,
            password: req.body.password,
            userToken: generateRandomString(20),
        })
        await user.save();
        const token = user.userToken;
        // res.cookie('token', token);
        res.json({
            code: 200, 
            message: "register successfully !",
            token: token
        });
    } catch(error) {
        res.json({
            code: 400,
            message: (error as Error).message,
        });
    }
} 

// [POST] api/v1/user/login
export const login = async (req: Request, res: Response) => {
    try {
        const email: string = req.body.email;
        const password: string = md5(req.body.password);
        const user = await User.findOne(
            { 
                email: email,
                deleted: false
            }
        );
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
    } catch(error) {
        res.json({
            code: 400,
            message: (error as Error).message,
        });
    }
} 

// [POST] api/v1/user/password/forgot
export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email: email, deleted: false }).select('fullName email');
        if (!user) {
            throw new Error('User does not exist !');
        }
        const otp = generateRandomNumber(6);
        const objectForgotPassword = {
            email: email,
            otp: otp,
            expireAt: Date.now()
        }
        const recordForgotPassword = new ForgotPassword(objectForgotPassword);
        await recordForgotPassword.save();
        //send mail
        const subject = "Your OTP";
        sendMail(email, subject, user!, otp);
        res.json({
            code: 200, 
        });
    } catch(error) {
        res.json({
            code: 400,
            message: (error as Error).message,
        });
    }
} 

// [POST] api/v1/user/password/otp
export const otpPassword = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const otp = req.body.otp;
        const record = await ForgotPassword.findOne({ email: email, otp: otp });
        if (!record) {
            throw new Error('OTP is invalid !');
        }
        const user = await User.findOne({ email: email, deleted: false });
        if (!user) throw new Error('Not found user');
        const token = user.userToken;
        res.json({
            code: 200, 
            token: token
        });
    } catch(error) {
        res.json({
            code: 400,
            message: (error as Error).message,
        });
    }
} 

// [POST] api/v1/user/password/reset
export const resetPassword = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const password = md5(req.body.password);
        const passwordConfirm = md5(req.body.passwordConfirm);
        const user = await User.findOne({ userToken: token });
        if (!user) {
            throw new Error('user does not exist !');
        }
        if (password !== passwordConfirm) {
            throw new Error('password or password confirm do not match !');
        }
        if (password === user.password) {
            throw new Error('new password cannot be the same as old password !');
        }
        await User.updateOne(
            { userToken: token },
            { password: password }
        );
        res.json({
            code: 200, 
            token: user.userToken
        });
    } catch(error) {
        res.json({
            code: 400,
            message: (error as Error).message,
        });
    }
} 

// [POST] api/v1/user/profile
export const profile = async (req: Request, res: Response) => {
    try {
        res.json({
            code: 200, 
            infor: (req as any).user
        });
    } catch(error) {
        res.json({
            code: 400,
            message: (error as Error).message,
        });
    }
} 
// [POST] api/v1/user/detail/:id
export const detailUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.params.id, deleted: false });
        if (!user) {
            throw new Error('User does not exist !');
        }
        res.json({
            code: 200, 
            user: user
        });
    } catch(error) {
        res.json({
            code: 400,
            message: (error as Error).message,
        });
    }
} 
// [POST] api/v1/user/listUser
export const listUser = async (req: Request, res: Response) => {
    try {
        const users = await User.find({ deleted: false }).select("fullName email");

        res.json({
            code: 200, 
            users: users
        });
    } catch(error) {
        res.json({
            code: 400,
            message: (error as Error).message,
        });
    }
} 
