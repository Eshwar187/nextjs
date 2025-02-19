import mongoose,{Schema,Document} from "mongoose";

export interface Message extends Document {
    content:string;
    createdAt:Date;
}

const MessageSchema:Schema<Message>=new Schema({
    content: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, required: true}
})

export interface User extends Document {
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isVerified:boolean;
    messages: Message[];
    isAcceptingMessage:boolean;
}

const UserSchema:Schema<User>=new Schema({
    username: {type: String, required: [true,"Username is required"], unique: true,trim: true},
    email: {type: String, required: [true,"Email is required"], unique: true,match:[/.+\@.+\..+/,"Please enter a valid email"]},
    password: {type: String, required:[true,"Password is required"]},
    verifyCode: {type: String, required:[true,"Verify Code is required"]},
    verifyCodeExpiry: {type: Date,required:[true,"Verify Code expiry is required"]},
    isVerified: {type: Boolean,default: false},
    messages: [MessageSchema],
    isAcceptingMessage: {type: Boolean, default: true}
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User1",UserSchema)

export default UserModel