import { create } from "domain";
import Link from "next/link";
import React from "react";
import styles from "./PostCard.module.css";

export default function PostCard({ title, children, createdAt, id }) {
  return (
    <>
      <div className={styles.root}>
        <div className={styles.title}>
          <Link href={`/posts/${id}`}>{title}</Link>
          <a className={styles.createdAt}>{createdAt}</a>
        </div>

        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
}
