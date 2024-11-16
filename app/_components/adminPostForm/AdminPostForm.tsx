"use client"

import { addPost } from "@/lib/actions";
import styles from "./adminPostForm.module.css";
import { useActionState } from "react";

const AdminPostForm = ({userId}:{userId:string}) => {
  const [state, formAction] = useActionState(addPost, undefined);
  
  return (
    <form action={formAction} className={styles.container}>
      <h1>Add New Post</h1>
      <input type="hidden" name="userId" value={userId} />
      <input type="text" name="title" placeholder="Title" />
      <input type="text" name="img" placeholder="img" />
      <textarea  name="desc" placeholder="desc" rows={10} />
      <button>Add</button>
      {state?.error}
    </form>
  );
};

export default AdminPostForm;