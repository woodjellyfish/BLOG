import Link from "next/link";
import Layout from "../../components/Layout";

const posts = ({ posts }) => (
  <Layout>
    <ul>
      {posts.map((post) => (
        <li>
          <Link href={"/posts/" + post.id}>{post.title}</Link>
        </li>
      ))}
    </ul>
  </Layout>
);

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
};

export default posts;
