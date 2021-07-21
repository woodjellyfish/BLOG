import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { CodeBlock } from "../components/reactMarkdown/Components";
import Layout from "../components/Layout";
import PostCard from "../components/post";
import { getAllPostIds, getPostFullData } from "../lib/post";
import RecentPosts from "../components/side/RecentPosts";

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
    <div className=" md:flex justify-center">
      <div className="flex-initial flex-col ">
        {allPostsData
          .slice(0)
          .reverse()
          .map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              createdAt={post.createdAt}
            >
              {post.contentHtml}
            </PostCard>
          ))}
      </div>
      <div className="md:block flex-auto max-w-sm bg-blue-300 ml-4 mt-4 rounded-md shadow-md sticky top-11 h-full ">
        <RecentPosts postsData={allPostsData} />
      </div>
    </div>
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
