require("dotenv").config();
const AWS = require("aws-sdk");

// AWS Configs
AWS.config.update({
  accessKeyId: process.env.AWSACCESSKEYID,
  secretAccessKey: process.env.AWSSECRETACCESSKEY,
  region: process.env.AWSREGION,
});

module.exports.sendEmail = (data) => {
  // Create sendEmail params
  let params = {
    Destination: {
      ToAddresses: [data.email],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: data.html,
        },
        Text: {
          Charset: "UTF-8",
          Data: "Scandidate...",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: data.subject,
      },
    },
    Source: "Scandidate.in" + process.env.AWSSENDERMAILID,
  };
  // Create the promise and SES service object
  let sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
    .sendEmail(params)
    .promise();

  // Handle promise's fulfilled/rejected states
  sendPromise
    .then(async (mailRes) => {
      console.log("Email sent successfully");
      return true;
    })
    .catch((err) => {
      console.log("Failed to send email", err);
      return false;
    });
};
