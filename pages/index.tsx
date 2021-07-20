import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { CodeBlock } from "../components/reactMarkdown/components";
import Layout from "../components/Layout";
import PostCard from "../components/post";
import { getAllPostIds, getPostFullData } from "../lib/post";

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
            {post.contentHtml}
          </PostCard>
        </div>
      ))}
  </Layout>
);

export const getStaticProps = async () => {
  const postIds = getAllPostIds();

  const allPostsData: PostData[] = [];
  for (let postId of postIds)
    allPostsData.push(await getPostFullData(postId.params.id));

  return {
    props: {
      allPostsData,
    },
  };
};

export default IndexPage;
