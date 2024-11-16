"use client";

import { handleGithubLogin, login } from "@/lib/actions";
import React from "react";
import styles from "./login.module.css";
import { useActionState } from "react";
import Link from "next/link";

function Login() {
  const [state, formAction] = useActionState(login, undefined);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action={handleGithubLogin}>
          <button className={styles.github}>Login with Github</button>
        </form>
        <form className={styles.form} action={formAction}>
          <input type="text" placeholder="username" name="username" />
          <input type="password" placeholder="password" name="password" />
          <button>Login with credentials</button>
          {state?.error}
          <Link href="/register">
            Don&#39;t have an account? <b>Register</b>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
