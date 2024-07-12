import connection from "@/dbconfig/dbConnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

connection()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody;


        const userExist = await User.findOne({ email })

        if (!userExist) {
            return NextResponse.json({ message: "User not found" }, { status: 400 });

        }

        //checking hased password
        const passMatched = await bcrypt.compare(password, userExist.password)

        if (!passMatched) {
            return NextResponse.json({ message: "Password mismatch" }, { status: 400 });
        } else {

            //creting the jwt

            const userData = {
                id: userExist._id,
                email: userExist.email
            }

            const token = await jwt.sign(userData, process.env.SECRET_KEY!, {expiresIn: "1d"})

            const response = NextResponse.json({ message: "user Login successfully", success: true, userExist });

            response.cookies.set("token", token, {
                httpOnly: true
            });
            return response;
        }


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: error.status });
    }
}