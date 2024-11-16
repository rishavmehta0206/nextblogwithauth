import { Post } from "@/lib/model";
import { connectToDB } from "@/lib/utils"
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
       await connectToDB();
       const posts = await Post.find();
       return NextResponse.json(posts)
    } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch the posts.");
    }
}