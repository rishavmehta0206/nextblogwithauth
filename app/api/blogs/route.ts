import { Post } from "@/lib/model";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectToDB(); 
        const blogs = await Post.find();
        return NextResponse.json(blogs);
    } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch the blogs.");
    }
}