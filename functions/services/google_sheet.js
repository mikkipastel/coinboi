// Firebase Cloud Function
const functions = require('firebase-functions');

// Get Google Sheets instance
const { google } = require("googleapis");
const sheets = google.sheets("v4");

// import module
const utils = require('./utils');
const lineTemplate = require('../templates/line_template');
const stockToken = require('./stock_token');

// Create JWT
var serviceAccount = require("../service-account.json");
const jwtClient = new google.auth.JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

function stockTokenCarousel(replyToken) {
    return sheets.spreadsheets.values.get({
        auth: jwtClient,
        spreadsheetId: functions.config().sheets.id,
        range: "stock token!A2:H6"
      }).then((response) => {
        var data = response.data.values;
        var length = data.length
        console.log(data);
        console.log(`${length} rows retrieved.`);

        var allStockTokenFlexMessage = [];
        data.forEach(stock => {
            const flexMessageResult = stockToken.setStockTokenPlanFlexMessage(stock);
            allStockTokenFlexMessage.push(flexMessageResult);
          }
        );

        return utils.reply(
          replyToken,
          lineTemplate.carouselTemplate("Stock Token price", allStockTokenFlexMessage)
        );
      });
}

function stockTokenFlexMessage(replyToken, name) {
    return sheets.spreadsheets.values.get({
        auth: jwtClient,
        spreadsheetId: functions.config().sheets.id,
        range: "stock token!A2:H6"
      }).then((response) => {
        var data = response.data.values;

        return data.forEach(stock => {
          const stockIdName = stock[0].split(":")[1].toLowerCase();
          if (stockIdName === name) {
            utils.reply(
              replyToken,
              stockToken.setFlexMessageForStockToken(stock)
            )
          }
        });
      });
}

module.exports = { stockTokenCarousel, stockTokenFlexMessage };