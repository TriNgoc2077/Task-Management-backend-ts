import { Request, Response, NextFunction } from 'express';
import User from '../Models/user.Model';

export const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (req.headers.authorization) {
            const userToken = req.headers.authorization.split(' ')[1];
            //req.header have header include: bearer GmHuJv86Aqis6mJklTRP
            const user = await User.findOne({ userToken: userToken, deleted: false }).select("-password -userToken");
            if (!user) {
                throw new Error('invalid token !');
            }
            (req as any)["user"] = user;
            next();
        } else {
            throw new Error('Token does not exist !');
        }
    } catch(error) {
        res.json({
            code: 400,
            message: (error as Error).message
        });
    }
}