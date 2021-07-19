import { create } from "domain";
import Link from "next/link";
import React from "react";
import { ReactElement } from "react-markdown";
import styles from "./PostCard.module.css";

type props = {
  title: string;
  id: string;
  createdAt: string;
  updatedAt?: string;
  children: ReactElement;
};

export default function PostCard({
  title,
  children,
  createdAt,
  updatedAt,
  id,
}: props) {
  return (
    <>
      <div className={styles.root}>
        <div className={styles.title}>
          <Link href={`/posts/${id}`}>{title}</Link>
          <a className={styles.createdAt}>作成日{createdAt}</a>
          {updatedAt && <a className={styles.createdAt}>更新日{updatedAt}</a>}
        </div>

        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
}
