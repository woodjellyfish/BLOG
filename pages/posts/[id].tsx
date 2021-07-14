import Layout from "../../components/Layout";
import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPostIds, getPostData } from "../../lib/post";

type Params = {
  params: {
    id: string;
  };
};

const post = ({ postData }) => (
  <Layout>
    <h2>{postData.title}</h2>
    <div>作成日:{postData.createdAt}</div>
    <div>更新日:{postData.updatedAt}</div>

    <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
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
