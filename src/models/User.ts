import mongoose, { Schema, Document } from "mongoose";
import bcrypt from 'bcrypt';
import { IDepartment } from "./Department";

export interface IUser extends Document {
    username: string,
    password: string,
    role: 'user' | 'manager',

    comparePassword(userPassword: string): Promise<boolean>
};

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'manager'],
        default: 'user'
    },
}, { timestamps: true });

// אחראית על הצפנת הסיסמה
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// השוואה בין הסיסמה שהמשתמש הזין לעומת ההצפנה
UserSchema.methods.comparePassword = async function (userPassword: string): Promise<boolean> {
    return await bcrypt.compare(userPassword, this.password)
}

// מגדיר מאפיין ספציפי בסכסמה כאינדקס
UserSchema.index({ role: 1 });
UserSchema.index({ username: 1 });
UserSchema.index({ salary: 1 });

export default mongoose.model<IUser>("User", UserSchema)