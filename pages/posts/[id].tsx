import Layout from "../../components/Layout";
import { GetStaticProps } from "next";

const post = ({ post }) => (
  <Layout>
    <h1>{post.title}</h1>
    <p>{post.body}</p>
  </Layout>
);

export const getStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  const paths = posts.map((post) => `/posts/${post.id}`);

  console.log(`paths`, paths);

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log(`params`, params);
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const post = await res.json();

  console.log(`post`, post);

  return { props: { post } };
};

export default post;
