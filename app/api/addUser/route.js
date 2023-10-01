import connectMongoDB from "../../../lib/mongodb";
// import Topic from "@/models/topic";
import User from "@/models/user";
import { NextResponse } from "next/server";


export async function POST(request) {
    const { mcnumber, name, email, password } = await request.json();
    await connectMongoDB();
    await User.create({ mcnumber, name, email, password });
    return NextResponse.json({ message: "User created" }, { status: 201 })
}


export async function GET() {
    await connectMongoDB();
    const topics = await User.find();
    return NextResponse.json({ topics });
}


export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id")
    await connectMongoDB();
    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "User Deleted" }, { status: 200 })
}