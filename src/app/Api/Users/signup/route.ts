import connection from "@/dbconfig/dbConnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

connection()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody;

        console.log(reqBody)

        //check the user is already registered or not

        const userExist = await User.findOne({ email })

        if (userExist) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });

        }
        
        //hasing the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({ username, email, password: hashedPassword })

        console.log(newUser)

        return NextResponse.json({ message: "user register successfully", success: true, newUser});

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: error.status });
    }
}