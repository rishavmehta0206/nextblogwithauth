
import React from "react";
import styles from "./admin.module.css";
import { getPosts } from "@/lib/data";
import Image from "next/image";
import { deletePost } from "@/lib/actions";

export default async function AdminPosts() {
  const posts = await getPosts();
  return (
    <div>
      <h1>Posts</h1>
      {posts?.map((post,index) => {
        return (
          <div key={index} className={styles.post}>
            <div className={styles.detail}>
              <Image
                src={post.img || "/noAvatar.png"}
                alt=""
                width={50}
                height={50}
              />
              <span className={styles.postTitle}>{post.title}</span>
            </div>
            <form action={async() => {
              'use server'
              await deletePost(post.id)
            }}>
              <button className={styles.postButton}>Delete</button>
            </form>
          </div>
        );
      })}
    </div>
  );
}
