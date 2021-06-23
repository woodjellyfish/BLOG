import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { APITOKEN } from "../../githubtoken";
import fs from "fs";
import { getSortedPostsData } from "../../lib/post";

const posts = ({ allPostsData }) => {
  {
    console.log(`allPostsData`, allPostsData);
  }
  return (
    <Layout>
      <Head>
        <title>page index</title>
      </Head>
      <ul>
        {allPostsData.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
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
