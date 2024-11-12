import { Post } from "@/lib/model";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { blogId: string } }) => {
  const { blogId } = params;
  try {
    await connectToDB(); 
    const blog = await Post.findById(blogId);
    
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(blog.toObject());
  } catch (error) {
    console.error("Error fetching the blog:", error);
    return NextResponse.json({ message: "Failed to fetch the blog." }, { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: { blogId: string } }) => {
    const { blogId } = params;
    try {
      await connectToDB(); 
      await Post.findByIdAndDelete(blogId);
    } catch (error) {
      console.error("Error fetching the blog:", error);
      return NextResponse.json({ message: "Failed to fetch the blog." }, { status: 500 });
    }
  };
