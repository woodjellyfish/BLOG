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
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <div className=" md:flex justify-center">
        <div className="flex-initial flex-col ">
          {allPostsData.map((post) => (
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

        <div className="hidden md:block flex-auto max-w-sm bg-blue-300 ml-4 mt-4 rounded-md shadow-md  top-11 h-full sticky">
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

  allPostsData.sort((a, b) => {
    if (a.createdAt < b.createdAt) {
      return 1;
    } else if (a.createdAt > b.createdAt) {
      return -1;
    } else {
      return 0;
    }
  });

  return {
    props: {
      allPostsData,
    },
  };
};

export default IndexPage;
