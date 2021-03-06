const functions = require("firebase-functions");
const axios = require("axios");

// LINE
const LINE_MESSAGING_API = "https://api.line.me/v2/bot"
const LINE_ACCESS_TOKEN = functions.config().line.access_token;
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${LINE_ACCESS_TOKEN}`
};

const reply = (token, payload) => {
  return axios({
    method: "post",
    url: `${LINE_MESSAGING_API}/message/reply`,
    headers: LINE_HEADER,
    data: JSON.stringify({
      replyToken: token,
      messages: [payload]
    })
  });
};

module.exports = { reply };
