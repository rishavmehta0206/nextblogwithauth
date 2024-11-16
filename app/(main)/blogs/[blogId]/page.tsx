import React, { Suspense } from "react";
import styles from "./post.module.css";
import Image from "next/image";
import PostUser from "@/app/_components/postuser/PostUser";
import { getPost } from "@/lib/data";

type Props = {
  params: {
    blogId: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const post = await getPost(params.blogId);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The post you are looking for does not exist.",
    };
  }

  return {
    title: post.title,
    description: post.desc || "Read more about this post",
  };
}

const getSingleData = async(blogId:string) => {
  const response = await fetch(`http://localhost:3000/api/blogs/${blogId}`,{next:{
    revalidate:3600
  }})
  return response.json();
}


const Blog = async ({ params }: Props) => {
  const { blogId } = params;
 
  // let blog = await getPost(blogId);
  const blog = await getSingleData(blogId);
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          fill
          src={blog.img}
          // src="https://images.pexels.com/photos/29235546/pexels-photo-29235546/free-photo-of-traditional-agave-harvesting-in-rural-mexico.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          className={styles.img}
        />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{blog.title}</h1>
        <div className={styles.detail}>
          <Suspense fallback={<>Loading...</>}>
            <PostUser userId={blog?.userId} />
          </Suspense>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Publised</span>
            <span className={styles.detailValue}>01.01.2021</span>
          </div>
        </div>
        <div className={styles.content}>{blog.desc}</div>
      </div>
    </div>
  );
};

export default Blog;
