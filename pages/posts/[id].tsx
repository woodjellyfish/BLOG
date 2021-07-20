import Layout from "../../components/Layout";
import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPostIds, getPostFullData } from "../../lib/post";
import PostCard from "../../components/post";
import { PostData } from "../../interfaces";

type Params = {
  params: {
    id: string;
  };
};

type Props = {
  postData: PostData;
};

const post = ({ postData }: Props) => (
  <Layout>
    <PostCard
      title={postData.title}
      id={postData.id}
      createdAt={postData.createdAt}
      updatedAt={postData.updatedAt}
    >
      {postData.contentHtml}
    </PostCard>
  </Layout>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const postData = await getPostFullData(params.id);
  return {
    props: {
      postData,
    },
  };
};

export default post;
