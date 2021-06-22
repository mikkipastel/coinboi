// Firebase Cloud Function
const functions = require('firebase-functions');
const region = "asia-east2";

// Firebase Admin initialization
const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://crypto-coinboi.firebaseio.com"
});

// import module
const googleSheet = require("./services/google_sheet");
const utils = require("./services/utils");

// Stock Token list
const stockTokenList = ['tsla', 'coin', 'mstr', 'aapl', 'msft'];

exports.lineBot = functions.region(region).https.onRequest((request, response) => {
  if (request.method === "POST") {
    const messageType = request.body.events[0].message.type;

    if (messageType === 'text') {
      const textMessage = request.body.events[0].message.text;
      
      if (textMessage === "#stock_token") {
        googleSheet.stockTokenCarousel(request.body.events[0].replyToken);
      } else if (textMessage[0] === "$") {
        const commandBody = textMessage.slice("$".length);
        const args = commandBody.split(' ');
        const name = args.shift().toLowerCase();

        const foundStockToken = stockTokenList.find(stockToken => stockToken === name);
        
        if (typeof foundStockToken === "string") {
          googleSheet.stockTokenFlexMessage(request.body.events[0].replyToken, name);
        } else {
          utils.reply(
            request.body.events[0].replyToken,
            { type: "text", text: `not have data for ${textMessage}` }
          )
        }
      }
    }
  }
  return response.status(200).send(request.method)
});

// exports.discordBot = functions.region(region).https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });