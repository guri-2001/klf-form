import { connectMongoDB } from "../../../lib/mongodb";
// import Note from "../../../models/addUser";
const careerInfo = require('../../../models/carrerInfo')
import { NextResponse } from "next/server";



export async function POST(req) {
    try {
        await connectMongoDB();
        const { mcnumber } = await req.json();
        const user = await careerInfo.findOne({mcnumber}).select("_id");
        console.log("user:", user);
        return NextResponse.json({ user });
    } catch (error) {
        console.log(error);
    }
}