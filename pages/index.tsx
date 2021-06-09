import Link from "next/link";
import Layout from "../components/Layout";

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello kikurage 👋</h1>
    <p>
      <div>
        <Link href="/about">
          <a>About</a>
        </Link>
      </div>
      <div>
        <Link href="/posts">
          <a>posts</a>
        </Link>
      </div>
    </p>
  </Layout>
);

export default IndexPage;
