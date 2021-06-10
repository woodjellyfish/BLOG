import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { APITOKEN } from "../../githubtoken";

const posts = ({ posts }) => {
  return (
    <Layout>
      <Head>
        <title>page index</title>
      </Head>
      <ul>
        {posts.map((post) => (
          <li>
            <Link href={`/posts/${post.name}`}>{post.name}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};
export const getStaticProps = async () => {
  const url =
    "https://api.github.com/repos/woodjellyfish/BLOG/contents/articles";
  const res = await fetch(url, {
    headers: {
      Authorization: "token" + APITOKEN,
    },
  });
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
};

export default posts;
