import Layout from "../../components/Layout";
import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPostIds, getPostFullData } from "../../lib/post";
import PostCard from "../../components/post";
import { CommentData, PostData } from "../../interfaces";
import ElementIdLinks from "../../components/side/ElementIdLinks";
import CommentList from "../../components/post/CommentList";
import { fetchCommentData } from "../../lib/comment";
import CreateCommentForm from "../../components/post/CreateCommentForm";

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

const post = ({ postData, commentData }: Props) => (
  <Layout>
    <div className=" md:flex justify-center">
      <div className="flex flex-col">
        <div className="flex-initial flex-col ">
          <PostCard
            title={postData.title}
            id={postData.id}
            createdAt={postData.createdAt}
            updatedAt={postData.updatedAt}
            contentHtml={postData.contentHtml}
          />
        </div>
        <div>
          <CreateCommentForm postId={postData.id} />
        </div>
        <div className="mt-4">
          {/* comment component */}
          <CommentList commentData={commentData} />
        </div>
      </div>
      <div className="md:block flex-auto max-w-sm bg-blue-300 ml-4 mt-4 rounded-md shadow-md sticky top-11 h-full ">
        <ElementIdLinks ids={extractionIds(postData.contentHtml)} />
      </div>
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
  const commentData = await fetchCommentData(params.id);
  return {
    props: {
      postData,
      commentData,
    },
  };
};

export default post;
