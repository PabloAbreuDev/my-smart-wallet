import { Schema, model, Document, MongooseError } from "mongoose";
import bcrypt from "bcrypt";
import { BaseModel } from "../repositories/default-mongodb-repository";

export interface IUser extends Document, BaseModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    verifyCode: string;
    verified: boolean
}

export const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true, minlength: 3 },
    lastName: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true , select: false},
    verifyCode: {type: String, required: true},
    verified: {type: Boolean, default: false}
}, {toJSON: {virtuals: true}});

userSchema.pre<IUser>("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        next();
    } catch (error) {
        next(error as MongooseError | undefined);
    }
});

const UserModel = model<IUser>('User', userSchema);

export default UserModel;
