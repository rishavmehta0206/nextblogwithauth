import React, { Suspense } from "react";
import styles from "./admin.module.css";
import AdminPosts from "@/app/_components/adminPosts/AdminPosts";
import AdminPostForm from "@/app/_components/adminPostForm/AdminPostForm";
import AdminUsers from "@/app/_components/adminUsers/AdminUsers";
import AdminUserForm from "@/app/_components/adminUserForm/AdminUserForm";
import { auth } from "@/lib/auth";
const Admin = async() => {
  const session = await auth();
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<>Loading...</>}>
            <AdminPosts />
          </Suspense>
        </div>
        <div className={styles.col}>
          <Suspense fallback={<>Loading...</>}>
            <AdminPostForm userId={session?.user?.id || ''} />
          </Suspense>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<>Loading...</>}>
            <AdminUsers />
          </Suspense>
        </div>
        <div className={styles.col}>
          <Suspense fallback={<>Loading...</>}>
            <AdminUserForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Admin;
