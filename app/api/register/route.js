import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

export async function POST(req) {
    try {
        const {mcnumber, name, email, password} = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        await connectMongoDB();
        await User.create({mcnumber, name, email, password: hashedPassword })
        return NextResponse.json({message : "User Registered"},{ status: 201} );
    } catch (error) {
        return NextResponse.json({message: "An error occured while register"},{ status : 500})
    }
}