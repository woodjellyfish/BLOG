import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";
import { CodeBlock, H2, P } from "../reactMarkdown/Components";

type props = {
  title: string;
  id: string;
  createdAt: string;
  updatedAt?: string;
  children: string;
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
      <div className="m-5 p-3 max-w-3xl mx-auto bg-blue-300 rounded-sm shadow-md ">
        <div className="px-2 bg-blue-400 rounded-md shadow-lg">
          <Link href={`/posts/${id}`}>
            <a
              id={id}
              className="px-0 mb-4 text-black text-2xl hover:bg-yellow-200"
            >
              {title}
            </a>
          </Link>
          <a className="px-7 text-right text-sm text-black font-normal">
            {createdAt}
          </a>
          {updatedAt && <a className="px-7">更新日{updatedAt}</a>}
        </div>

        <div className="text-base">
          <ReactMarkdown components={{ code: CodeBlock, h2: H2, p: P }}>
            {children}
          </ReactMarkdown>
        </div>
      </div>
    </>
  );
}
