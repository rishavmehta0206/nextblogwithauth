"use client";

import { register } from "@/lib/actions";
import { useActionState } from "react";
import styles from "./register.module.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Register() {
  const [state, formAction] = useActionState(register, undefined);
  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/login");
  }, [state?.success,router]);


  return (
    <div className={styles.container}>
      <form className={styles.wrapper} action={formAction}>
        <input
          className={styles.inputField}
          type="text"
          placeholder="username"
          name="username"
        />
        <input
          className={styles.inputField}
          type="email"
          placeholder="email"
          name="email"
        />
        <input
          className={styles.inputField}
          type="password"
          placeholder="password"
          name="password"
        />
        <input
          className={styles.inputField}
          type="password"
          placeholder="password again"
          name="passwordRepeat"
        />
        <button className={styles.registerButton}>Register</button>
      {
        state?.error
      }
        <Link href='/login'>Have an account? <b>Login</b></Link>
      </form>
    </div>
  );
}

export default Register;
