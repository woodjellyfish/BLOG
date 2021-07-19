import Layout from "../../components/Layout";
import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPostIds, getPostData } from "../../lib/post";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../../components/codeBlock/CodeBlock";
import PostCard from "../../components/post";

type Params = {
  params: {
    id: string;
  };
};

type PostData = {
  postData: {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    contentHtml: string;
  };
};

const post = ({ postData }: PostData) => (
  <Layout>
    <PostCard
      title={postData.title}
      id={postData.id}
      createdAt={postData.createdAt}
      updatedAt={postData.updatedAt}
    >
      <ReactMarkdown components={{ code: CodeBlock }}>
        {postData.contentHtml}
      </ReactMarkdown>
    </PostCard>
  </Layout>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  console.log(`paths`, paths);

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
};

export default post;
