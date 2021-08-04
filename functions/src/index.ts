/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as sendgrid from "@sendgrid/mail";

const serviceAccount = require("../key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.sendMail = functions.https.onRequest(async (request, response) => {
  functions.logger.info("sendMail start");
  const apiKey = functions.config().sendgrid_service.key;
  const fromEmail = functions.config().sendgrid_service.email;
  const fromName = functions.config().sendgrid_service.name;

  sendgrid.setApiKey(apiKey);
  const message = {
    to: "woodjellyfish1@gmail.com",
    from: `${fromName}<${fromEmail}>`,
    subject: "テストメール",
    text: "テストメール本文",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  sendgrid
    .send(message)
    .then((result) => {
      functions.logger.info("sendMail success!");
      response.send("sendMail success!");
      return console.log("Successfully sent message:", result);
    })
    .catch((error) => {
      functions.logger.error("sendMail error");
      functions.logger.error(error);
      response.send("sendMail error");
      return console.log("Error sending message:", error);
    });
});
