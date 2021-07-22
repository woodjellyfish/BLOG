import Link from "next/link";
import React from "react";
import { PostData } from "../../interfaces";

type Props = {
  postsData: PostData[];
};
export default function RecentPosts({ postsData }: Props) {
  // IDリンク時の調整
  const scrollId = (id: string) => {
    const top = document.getElementById(id).getBoundingClientRect().top;
    const headerHeight = document.getElementById("header").clientHeight;
    console.log("top :>> ", top);
    window.scroll({
      top: top + window.pageYOffset - headerHeight - 30,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <ul>
        {postsData
          .slice(0)
          .reverse()
          .map((postData) => (
            <li key={postData.id} className="text-lg hover:bg-yellow-300">
              <Link href={`/posts/${postData.id}`}>{postData.title}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
