import Layout from "../../components/Layout";
import { GetStaticProps } from "next";
import matter from "gray-matter";
import { APITOKEN } from "../../githubtoken";

const post = ({ post }) => (
  <Layout>
    <h2>{post.title}</h2>
    <div>{post.date}</div>
    <p>{post.content}</p>
  </Layout>
);

export const getStaticPaths = async () => {
  const url =
    "https://api.github.com/repos/woodjellyfish/BLOG/contents/articles";
  const res = await fetch(url, {
    headers: {
      Authorization: "token" + APITOKEN,
    },
  });
  const posts = await res.json();

  const paths = posts.map((post) => `/posts/${post.name}`);

  console.log(`paths`, paths);

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const url = `https://api.github.com/repos/woodjellyfish/BLOG/contents/articles/${params.id}`;
  const res = await fetch(url, {
    headers: {
      Authorization: "token" + APITOKEN,
    },
  });
  const data = await res.json();

  const buffer = new Buffer(data.content, "base64");
  const markdown = buffer.toString("utf-8");

  const matterResult = matter(markdown);

  console.log(`matterResult:data`, matterResult.data);

  // console.log(`matterResult`, matterResult);

  const post = {
    content: matterResult.content,
    ...matterResult.data,
  };

  console.log(`post`, post);

  return { props: { post } };
};

export default post;
