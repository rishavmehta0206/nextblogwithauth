import { Post } from "@/lib/model";
import { connectToDB } from "@/lib/utils"
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
       await connectToDB();
       let posts = await Post.find();
       return NextResponse.json(posts)
    } catch (error) {
        throw new Error("Failed to fetch the posts.");
    }
}