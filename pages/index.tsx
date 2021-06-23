import Link from "next/link";
import Layout from "../components/Layout";
import { getSortedPostsData } from "../lib/post";

const IndexPage = ({ allPostsData }) => (
  <Layout title="Home | Next.js + TypeScript Example">
    {allPostsData.map((post) => (
      <li key={post.id}>
        <div>{post.title}</div>
        <div>{post.createdAt}</div>
      </li>
    ))}
  </Layout>
);

export const getStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

export default IndexPage;
