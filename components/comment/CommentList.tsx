import React from "react";
import useSWR from "swr";
import { CommentData } from "../../interfaces";

type Props = {
  postId: string;
};

export default function CommentList({ postId }: Props) {
  const fetcher = async (url: string): Promise<CommentData[] | null> => {
    const res = await fetch(url);
    return await res.json();
  };
  const { data, error } = useSWR(`/api/comment/?id=${postId}`, fetcher);

  const List = () => {
    if (error) return <div>読み込みに失敗しました。</div>;
    if (!data) return <div>読込中</div>;
    if (data.length == 0)
      return <div className="px-2">コメントはありません</div>;
    return (
      <div className="px-2">
        {data.map((comment, i) => (
          <div className="mb-3 ml-2" key={i}>
            <p>{comment.userName}</p>
            <p>{comment.message}</p>
            <p>{comment.createdAt}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="bg-white rounded-md shadow-md">
        <h3 className="font-bold px-2">コメント一覧</h3>
        <List />
      </div>
    </>
  );
}
