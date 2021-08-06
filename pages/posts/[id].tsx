import Layout from "../../components/Layout";
import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPostIds, getPostFullData } from "../../lib/post";
import { PostPage } from "../../components/post";
import { CommentData, PostData } from "../../interfaces";
import ElementIdLinks from "../../components/side/ElementIdLinks";
import CommentBase from "../../components/comment/CommentBase";
import { SideMenu } from "../../components/side";

type Params = {
  params: {
    id: string;
  };
};

type Props = {
  postData: PostData;
  commentData: CommentData[];
};

const extractionIds = (md: string) => {
  const h2Tags = md.match(/^#{2} .+/gm);
  if (h2Tags === null) return [];
  const ids = h2Tags.map((tag) => tag.replace("## ", ""));

  return ids;
};

const post = ({ postData }: Props) => (
  <Layout>
    <div className="md:flex justify-start flex-grow ">
      <div className="flex flex-col flex-grow m-3">
        <div className="flex-initial flex-col flex-grow ">
          <PostPage
            title={postData.title}
            id={postData.id}
            createdAt={postData.createdAt}
            updatedAt={postData.updatedAt}
            contentHtml={postData.contentHtml}
          />
        </div>
        <CommentBase postId={postData.id} />
      </div>

      <SideMenu>
        <ElementIdLinks ids={extractionIds(postData.contentHtml)} />
      </SideMenu>
    </div>
  </Layout>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const postData = await getPostFullData(params.id);
  //firebase firestoreからコメントデータを取得
  // const commentData = await fetchCommentData(params.id);
  return {
    props: {
      postData,
      // commentData,
    },
  };
};

export default post;
