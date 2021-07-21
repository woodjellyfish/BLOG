import Link from "next/link";
import React from "react";
import { PostData } from "../../interfaces";

type Props = {
  postsData: PostData[];
};
export default function RecentPosts({ postsData }: Props) {
  return (
    <div>
      <ul>
        {postsData
          .slice(0)
          .reverse()
          .map((postData) => (
            <li key={postData.id} className="text-lg hover:bg-yellow-300">
              <Link href={`/#${postData.id}`}>{postData.title}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
