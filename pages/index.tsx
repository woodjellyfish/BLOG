import Link from "next/link";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../components/codeBlock/CodeBlock";
import Layout from "../components/Layout";
import PostCard from "../components/post";
import { getAllPostIds, getPostData } from "../lib/post";

type PostData = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  contentHtml: string;
};

type PostsData = {
  allPostsData: PostData[];
};

const IndexPage = ({ allPostsData }: PostsData) => (
  <Layout title="Home | Next.js + TypeScript Example">
    {allPostsData
      .slice(0)
      .reverse()
      .map((post) => (
        <div key={post.id}>
          <PostCard id={post.id} title={post.title} createdAt={post.createdAt}>
            <ReactMarkdown components={{ code: CodeBlock }}>
              {post.contentHtml}
            </ReactMarkdown>
          </PostCard>
        </div>
      ))}
  </Layout>
);

export const getStaticProps = async () => {
  // const allPostsData = getSortedPostsData();
  const postIds = getAllPostIds();

  const allPostsData: PostData[] = [];
  for (let postId of postIds)
    allPostsData.push(await getPostData(postId.params.id));

  return {
    props: {
      allPostsData,
    },
  };
};

export default IndexPage;
