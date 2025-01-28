import mongoose from "mongoose";
import { forgotPassword } from "../Controllers/user.Controller";

const forgotPasswordSchema = new mongoose.Schema(
    {
        email: String,
        otp: String,
        expireAt: {
            type: Date,
            expires: 180
        }
    },
    {
        timestamps: true
    }
);

const ForgotPassword = mongoose.model('ForgotPassword', forgotPasswordSchema, "forgot-password");

export default ForgotPassword;