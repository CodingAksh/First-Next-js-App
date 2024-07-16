import connection from "@/dbconfig/dbConnect";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";

connection()


export async function POST(request: NextRequest) {
    try {

        const requestBody = await request.json()
        // console.log('requested token: ', requestBody);
        const { token } = requestBody
        // console.log("user verifying token: ",token)

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        })

        if (!user) {
            NextResponse.json({ error: "Invalid token" })
        }
        console.log("verified user details: ",user)

        user.isVerfied = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save()

        return NextResponse.json({
            message: "User verified successfully",
            success: true
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.messge }, { status: 500 })
    }
}