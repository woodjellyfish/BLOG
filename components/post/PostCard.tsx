import React, { useEffect } from "react";
import { PostData } from "../../interfaces";
import { PostPage } from "./index";
export default function PostCard({
  title,
  contentHtml,
  createdAt,
  updatedAt,
  id,
}: PostData) {
  return (
    <div className="rounded-xl flex">
      <PostPage
        id={id}
        title={title}
        createdAt={createdAt}
        updatedAt={updatedAt}
        contentHtml={contentHtml}
      />
    </div>
  );
}
