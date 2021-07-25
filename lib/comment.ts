import { db } from "../firebase/clientApp";
import { sendData } from "next/dist/next-server/server/api-utils";
import { dbAdmin } from "../firebase/nodeApp";

export const fetchCommentData = async (id: string) => {
  const commentData = [];
  await db
    .collection("comments")
    .where("postId", "==", id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        commentData.push(doc.data());
      });
    })
    .catch((error) => {
      console.log(error);
    });

  commentData.sort((a, b) => {
    if (a.createdAt < b.createdAt) {
      return 1;
    } else {
      return -1;
    }
  });

  return commentData;
};
