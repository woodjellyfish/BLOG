import Link from "next/link";
import { PostData } from "../../interfaces";

type Props = {
  postsData: PostData[];
};
export default function RecentPosts({ postsData }: Props) {
  return (
    <div className="flex flex-col">
      <a className="font-bold text-lg m-2 rounded-sm  bg-blue-400">
        最近の投稿
      </a>
      <ul>
        {postsData.map((postData) => (
          <div key={postData.id}>
            <li className="text-lg ml-3 hover:bg-yellow-300">
              <Link href={`/posts/${postData.id}`}>{postData.title}</Link>
            </li>
            <div className="ml-5">{postData.createdAt}</div>
          </div>
        ))}
      </ul>
    </div>
  );
}
