
import Links from "../links/Links";
import styles from "./navbar.module.css";
import Link from "next/link";
import { auth } from "@/lib/auth";



const Navbar = async () => {
  let session = await auth();
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        Logo
      </Link>
      <div className="">
        <Links session={session} />
      </div>
    </div>
  );
};

export default Navbar;
