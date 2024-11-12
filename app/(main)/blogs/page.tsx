import React from "react";
import styles from "./blogs.module.css";
import PostCard from "@/app/_components/postCard/PostCard";
import { getPosts } from "@/lib/data";

export const metadata = {
  title:'Blogs',
  description:'This page shows total blogs.'
}

// const getData = async() => {
//   let response = await fetch("http://localhost:3000/api/blogs",{next:{
//     revalidate:3600
//   }})
//   return response.json();
// }

const Blogs = async () => {
  const posts = await getPosts();
  // const posts = await getData();
  return (
    <div className={styles.container}>
      {posts?.map((post) => {
        return (
          <div className={styles.post}>
            <PostCard post={post} />
          </div>
        );
      })}
      {/* <div className={styles.post}>
        <PostCard />
      </div>
      <div className={styles.post}>
        <PostCard />
      </div>
      <div className={styles.post}>
        <PostCard />
      </div> */}
    </div>
  );
};

export default Blogs;
