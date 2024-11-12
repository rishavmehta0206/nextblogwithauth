import { Post } from "@/lib/model";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
        connectToDB();
        let blogs = await Post.find();
        return NextResponse.json(blogs);
    } catch (error) {
        throw new Error("Failed to fetch the blogs.");
    }
}