import * as sendgrid from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const apiKey = process.env.SENDGRID_SERVICE_KEY;
  const fromEmail = "woodjellyfish1@gmail.com";

  sendgrid.setApiKey(apiKey);

  const { postId, commentMessage, userName } = req.body;
  const message = {
    to: "woodjellyfish1@gmail.com",
    from: `自動メール<${fromEmail}>`,
    subject: `${postId}にコメントが投稿されました。`,
    text: `投稿者: ${userName}\n投稿内容:${commentMessage}`,
    // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  try {
    const result = await sendgrid.send(message);
    res.status(200).send("sendMail success!");
  } catch (error) {
    res.status(500).send("sendMail error");
  }
};

export default handler;
