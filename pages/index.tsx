import Layout from "../components/Layout";
import PostCard from "../components/post";
import { getAllPostIds, getPostFullData } from "../lib/post";
import RecentPosts from "../components/side/RecentPosts";
import { PostData } from "../interfaces";
import { useState } from "react";

type PostsData = {
  allPostsData: PostData[];
};

const IndexPage = ({ allPostsData }: PostsData) => {
  const [sideStyle, setSideStyle] = useState(
    "flex-auto max-w-sm bg-blue-300 ml-4 mt-4 rounded-md shadow-md  top-11 h-full "
  );

  return (
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
                updatedAt={post.updatedAt}
                contentHtml={post.contentHtml}
              />
            ))}
        </div>

        <div className={sideStyle}>
          <RecentPosts postsData={allPostsData} />
        </div>
      </div>
    </Layout>
  );
};
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
