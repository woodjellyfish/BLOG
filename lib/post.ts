import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PostData } from "../interfaces";

const postsDirectory = path.join(process.cwd(), "articles");

export const getSortedPostsData = (): PostData[] => {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData: PostData[] = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullpath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullpath, "utf-8");

    const matterResult = matter(fileContents);
    const { title, createdAt, updatedAt } = matterResult.data;

    return {
      id,
      title,
      createdAt,
      updatedAt,
    };
  });

  return allPostsData.sort(({ createdAt: a }, { createdAt: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
};

export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
};

export const getPostFullData = async (id: string) => {
  const fullpath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullpath, "utf8");

  const matterResult = matter(fileContents);
  const updatedAt = String(matterResult.data.updatedAt);
  const createdAt = String(matterResult.data.createdAt);
  const title = String(matterResult.data.title);

  const contentHtml = matterResult.content;

  return {
    id,
    contentHtml,
    createdAt,
    updatedAt,
    title,
  };
};
