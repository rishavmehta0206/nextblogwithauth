"use client"

import Link from "next/link";
import React, { useState } from "react";
import styles from "./links.module.css";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { signOut } from "@/lib/auth";
import { handleLogout } from "@/lib/actions";

const routes = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Blogs",
    path: "/blogs",
  },
];

const Links = ({session}) => {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();
  console.log('pathName',session,pathName)

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {routes?.map((route) => (
          <div
            className={`${styles.container} ${
              pathName === route.path && styles.active
            }`}
          >
            <Link key={route.title} href={route.path}>
              {route.title}
            </Link>
          </div>
        ))}
        {session && session.user ? (
          <>
            {session.user?.isAdmin && <Link href="/admin">Admin</Link>}
            <button className={styles.logout} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
      <Image className={styles.menuButton} alt="" src="/menu.png" width={30} height={30} onClick={()=>setOpen(prev => !prev)}/>
      {
        open && <div style={{
          zIndex:'999'
        }} className={styles.mobileLinks}>
            {
                routes?.map(route => <div className={`${styles.container} ${
                  pathName === route.path && styles.active
                }`}><Link key={route.path} href={route.path}>{route.title}</Link></div>)
            }
        </div>
      }
    </div>
  );
};

export default Links;
