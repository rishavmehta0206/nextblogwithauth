"use server";

import { signIn, signOut } from "./auth";
import { Post, User } from "./model";
import bcrypt from "bcrypt";
import { connectToDB } from "./utils";
// Remove unused import
// import { authConfig } from "./auth.config";
import { revalidatePath } from "next/cache";

export const addPost = async (prevState: any, formData: FormData) => {
  const { title, desc, userId, img } = Object.fromEntries(formData);
  try {
    await connectToDB();
    // Use const since it's not reassigned
    const newPost = await Post.create({
      title,
      desc,
      userId,
      img,
    });
    console.log('Post created:', newPost); // Use the newPost value
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) { // Rename error to err since it's used
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deletePost = async (id: string) => {
  try {
    await connectToDB();
    await Post.findByIdAndDelete(id);
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) { // Rename error to err
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const addUser = async (prevState: any, formData: FormData) => {
  const { username, email, password, img } = Object.fromEntries(formData);
  try {
    await connectToDB();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      img,
    });
    console.log('User created:', newUser); // Use the newUser value
    revalidatePath("/admin");
  } catch (err) { // Rename error to err
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deleteUser = async (id: string) => {
  try {
    await connectToDB();
    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    revalidatePath("/admin");
  } catch (err) { // Rename error to err
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const register = async (previousState: any, formData: FormData) => {
  const { username, email, password, img, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }

  try {
    await connectToDB();
    const user = await User.findOne({ username });

    if (user) {
      return { error: "Username already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
    });

    await newUser.save();
    console.log("saved to db");

    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const login = async (prevState: any, formData: FormData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    console.log(err);

    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};

export const handleGithubLogin = async () => {
  await signIn("github");
};

export const handleLogout = async () => {
  await signOut();
};