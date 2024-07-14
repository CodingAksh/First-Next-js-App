import { getDataFromToken } from "@/helpers/getTokenData";

import { NextRequest, NextResponse } from "next/server";
import User from '@/models/userModel'
import connection from "@/dbconfig/dbConnect";

connection()

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }
        const userData = await User.findOne({ _id: userId }).select("-password")

        return NextResponse.json({message: "user found", data: userData }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}