import { Request, Response } from 'express';
import User from '../Models/user.Model';
import { generateRandomString, generateRandomNumber } from '../../../Helpers/generate';
import md5 from "md5";
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
        res.cookie('token', token);
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