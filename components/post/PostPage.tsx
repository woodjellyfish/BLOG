import { create } from "domain";
import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";
import { PostData } from "../../interfaces";
import { CodeBlock, H2, H3, P } from "./Components";

export default function PostPage({
  title,
  contentHtml,
  createdAt,
  updatedAt,
  id,
}: PostData) {
  return (
    <>
      <div className="p-3 mb-3 bg-white rounded-xl shadow-md ">
        <div className="px-2 bg-gray-200 rounded-md shadow-lg">
          <Link href={`/posts/${id}`}>
            <a
              id={id}
              className="px-0 mb-4 font-bold text-3xl text-blue-500 hover:underline"
            >
              {title}
            </a>
          </Link>
        </div>

        <div>
          <a className="ml-3">
            作成日:{createdAt} | 更新日:{updatedAt}
          </a>
        </div>

        <div className="text-base ">
          <ReactMarkdown components={{ code: CodeBlock, h2: H2, h3: H3, p: P }}>
            {contentHtml}
          </ReactMarkdown>
        </div>
      </div>
    </>
  );
}
