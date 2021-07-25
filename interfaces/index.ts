// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type PostData = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  contentHtml?: string;
};

export type CommentData = {
  id: string;
  postId: string;
  message: string;
  createdAt: string;
  userName: string;
};
