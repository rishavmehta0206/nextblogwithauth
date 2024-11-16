"use server";

import { signIn, signOut } from "./auth";
import { Post, User } from "./model";
import bcrypt from "bcrypt";
import { connectToDB } from "./utils";
import { revalidatePath } from "next/cache";

export const addPost = async (prevState, formData) => {
  const { title, desc, userId, img } = Object.fromEntries(formData);
  try {
    await connectToDB();
    await Post.create({
      title,
      desc,
      userId,
      img,
    });
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch {
    return { error: "Something went wrong!" };
  }
};

export const deletePost = async (id: string) => {
  try {
    await connectToDB();
    await Post.findByIdAndDelete(id);
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch {
    return { error: "Something went wrong!" };
  }
};

export const addUser = async (prevState, formData) => {
  const { username, email, password, img } = Object.fromEntries(formData);
  try {
    await connectToDB();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.create({
      username,
      email,
      password: hashedPassword,
      img,
    });
    revalidatePath("/admin");
  } catch {
    return { error: "Something went wrong!" };
  }
};

export const deleteUser = async (id: string) => {
  try {
    await connectToDB();
    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    revalidatePath("/admin");
  } catch {
    return { error: "Something went wrong!" };
  }
};
