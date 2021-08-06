import Link from "next/link";
import { PostData } from "../../interfaces";

type Props = {
  postsData: PostData[];
};
export default function RecentPosts({ postsData }: Props) {
  return (
    <div className="flex flex-col">
      <a className="bg-gray-400 rounded-lg shadow-md text-white px-4">
        最近の投稿
      </a>
      <ul>
        {postsData.map((postData) => (
          <div key={postData.id} className="mx-3 mt-2">
            <li className="text-lg box-border h-auto text-blue-400 hover:underline">
              <Link href={`/posts/${postData.id}`}>{postData.title}</Link>
            </li>
            <div className="ml-5">{postData.createdAt}</div>
          </div>
        ))}
      </ul>
    </div>
  );
}
