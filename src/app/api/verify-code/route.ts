import dbConnect from "@/lib/dbConnect"
import UserModel from "@/models/User"

export async function POST(request:Request){
    await dbConnect()
    try {
        const {username,code}=await request.json()
        const decodeUsername=decodeURIComponent(username)
        const user=await UserModel.findOne({username: decodeUsername})
        if(!user){
            return Response.json( {
                success: false,
                message: "User not found"
            },{status: 500})
        }

        const isCodeValid=user.verifyCode===code
        const isCodeNotExpired=new Date(user.verifyCodeExpiry)>new Date()
        if(isCodeValid && isCodeNotExpired){
            user.isVerified=true
            await user.save()
            return Response.json({
                success: true,
                message: "User verified successfully"
            },{status: 200})
        } else if(!isCodeNotExpired){
            return Response.json( {
                success: false,
                message: "Verification code expired"
            },{status: 401})
        }else{
            return Response.json( {
                success: false,
                message: "Invalid verification code"
            },{status: 401})
        }
    } catch (error) {
        console.error("Error checking Username",error)
        return Response.json( {
            success: false,
            message: "Error checking username"
        },{status: 500})
        
    }
}


