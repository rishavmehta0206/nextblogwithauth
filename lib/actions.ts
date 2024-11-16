"use server";

import { signIn, signOut } from "./auth";
import { Post, User } from "./model";
import bcrypt from "bcrypt";
import { connectToDB } from "./utils";
import { revalidatePath } from "next/cache";

// Define interfaces for our state and form data
interface FormState {
  error?: string;
  success?: boolean;
}

interface PostFormData {
  title: string;
  desc: string;
  userId: string;
  img: string;
}

interface UserFormData {
  username: string;
  email: string;
  password: string;
  img: string;
  passwordRepeat?: string;
}

export const addPost = async (prevState: FormState, formData: FormData) => {
  const data = Object.fromEntries(formData) as unknown as PostFormData;
  try {
    await connectToDB();
    const newPost = await Post.create({
      title: data.title,
      desc: data.desc,
      userId: data.userId,
      img: data.img,
    });
    console.log('Post created:', newPost);
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
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
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const addUser = async (prevState: FormState, formData: FormData) => {
  const data = Object.fromEntries(formData) as unknown as UserFormData;
  try {
    await connectToDB();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const newUser = await User.create({
      username: data.username,
      email: data.email,
      password: hashedPassword,
      img: data.img,
    });
    console.log('User created:', newUser);
    revalidatePath("/admin");
  } catch (err) {
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
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const register = async (previousState: FormState, formData: FormData) => {
  const data = Object.fromEntries(formData) as unknown as UserFormData;

  if (data.password !== data.passwordRepeat) {
    return { error: "Passwords do not match" };
  }

  try {
    await connectToDB();
    const user = await User.findOne({ username: data.username });

    if (user) {
      return { error: "Username already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const newUser = new User({
      username: data.username,
      email: data.email,
      password: hashedPassword,
      img: data.img,
    });

    await newUser.save();
    console.log("saved to db");

    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const login = async (prevState: FormState, formData: FormData) => {
  const data = Object.fromEntries(formData) as unknown as Pick<UserFormData, 'username' | 'password'>;

  try {
    await signIn("credentials", { username: data.username, password: data.password });
  } catch (err) {
    console.log(err);

    if (err instanceof Error && err.message.includes("CredentialsSignin")) {
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