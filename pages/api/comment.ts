import { db } from "../../firebase/nodeApp";
import { formatToTimeZone } from "date-fns-timezone";
import { CommentData } from "../../interfaces";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dbRef = db.collection("comments");

  switch (req.method) {
    case "GET": {
      const { id } = req.query;
      const commentData = [];
      try {
        const snapshots = await dbRef.where("postId", "==", id).get();
        snapshots.forEach((doc) => {
          commentData.push(doc.data());
        });

        commentData.sort((a, b) => {
          if (a.createdAt < b.createdAt) {
            return 1;
          } else {
            return -1;
          }
        });
        res.status(200).json(commentData);
      } catch (error) {
        res.status(500).json(error);
      }

      break;
    }
    case "POST": {
      const { postId, commentMessage, userName } = req.body;
      const id = dbRef.doc().id;
      const date = new Date();
      const jpDate = formatToTimeZone(date, "YYYY-MM-DD HH:mm:ss", {
        timeZone: "Asia/Tokyo",
      });

      const sendCommentData: CommentData = {
        id: id,
        postId: postId,
        message: commentMessage,
        createdAt: jpDate,
        userName: userName,
      };



      

      try {
        const commentRef = await dbRef.add(sendCommentData);
        const resBody = await commentRef.get();
        res.status(200).json(resBody.data());
        const adminMailData = {
          to: "woodjellyfish1@gmail.com",
          message: {
            subject: "mail test",
            text: "test",
          },
        };

        // db.collection("mail").add(adminMailData);
      } catch (error) {
        res.status(500).json(error);
      }

      break;
    }
    default: {
      res.status(403).end();
    }
  }
}
