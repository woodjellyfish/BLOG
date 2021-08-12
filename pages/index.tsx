import Layout from "../components/Layout";
import { getAllPostIds, getPostFullData } from "../lib/post";
import RecentPosts from "../components/side/RecentPosts";
import { PostData } from "../interfaces";
import { PostCard, PostPage } from "../components/post/index";
import { SideMenu } from "../components/side";

type PostsData = {
  allPostsData: PostData[];
};

const IndexPage = ({ allPostsData }: PostsData) => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <div className="block md:flex md:justify-between lg:justify-center">
        <div className="m-2 md:my-3 md:ml-6 md:w-[calc(100%-380px)] lg:max-w-screen-lg">
          {allPostsData.map((post) => (
            <PostPage
              key={post.id}
              id={post.id}
              title={post.title}
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
              contentHtml={post.contentHtml}
            />
          ))}
        </div>

        <SideMenu>
          <RecentPosts postsData={allPostsData} />
        </SideMenu>
      </div>
    </Layout>
  );
};
export const getStaticProps = async () => {
  const postIds = getAllPostIds();

  const allPostsData: PostData[] = [];
  for (let postId of postIds)
    allPostsData.push(await getPostFullData(postId.params.id));

  allPostsData.sort((a, b) => {
    if (a.createdAt < b.createdAt) {
      return 1;
    } else if (a.createdAt > b.createdAt) {
      return -1;
    } else {
      return 0;
    }
  });

  return {
    props: {
      allPostsData,
    },
  };
};

export default IndexPage;
