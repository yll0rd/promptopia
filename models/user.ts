import {Schema, models, model, Document, Model} from "mongoose";

export interface UserType extends Document{
    id?: number;
    email: string;
    username: string;
    image: string;
}

const UserSchema = new Schema({
    id: Number,
    email: {
        type: String,
        unique: [true, "Email already exists!"],
        required: [true, "Email is required!"],
    },
    username: {
        type: String,
        required: [true, "Username is required!"],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique"]
    },
    image: {
        type: String
    },
})

const User = models.User as Model<UserType> || model<UserType>("User", UserSchema)

export default User;