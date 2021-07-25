import { GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../../components/Layout";
import RecentPosts from "../../components/side/RecentPosts";
import { PostData } from "../../interfaces";
import { getSortedPostsData } from "../../lib/post";

type AllPostsData = {
  allPostsData: PostData[];
};

const posts = ({ allPostsData }: AllPostsData) => {
  return (
    <Layout>
      <Head>
        <title>page index</title>
      </Head>
      <RecentPosts postsData={allPostsData} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

export default posts;
