const lineTemplate = require('../templates/line_template')

function setStockTokenPlanFlexMessage(stock) {
    const greenTextTitle = "#00701a";
    const greenTextBody = "#43a047";
    
    const redTextTitle = "#ab000d";
    const redTextBody = "#e53935";

    const stockId = stock[0];
    const stockName = stock[1];
    const stockPrice = stock[2];
    const stockPe = stock[3];
    const stockChange = stock[4];
    const stockChangepct = stock[5];
    const stockButtonUrl = `https://www.google.com/finance/quote/${stockId.split(":")[1]}:${stockId.split(":")[0]}`;

    if (stockChange > 0) {
        stockTextTitleColor = greenTextTitle;
    } else {
        stockTextTitleColor = redTextTitle;
    }
    
    if (stockChange > 0) {
        stockTextBodyColor = greenTextBody;
    } else {
        stockTextBodyColor = redTextBody;
    }

    return {
        "type": "bubble",
        "direction": "ltr",
        "header": {
          "type": "box",
          "layout": "vertical",
          "backgroundColor": "#E5E5E5FF",
          "contents": [
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": stockId,
                  "weight": "bold",
                  "size": "xl",
                  "contents": []
                },
                {
                  "type": "text",
                  "text": stockName,
                  "contents": []
                }
              ]
            }
          ]
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": stockPrice,
                  "weight": "bold",
                  "size": "xl",
                  "flex": 1,
                  "align": "start",
                  "contents": []
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    {
                      "type": "text",
                      "text": `(${stockChangepct}) `,
                      "size": "sm",
                      "color": stockTextBodyColor,
                      "align": "start",
                      "contents": [
                        {
                          "type": "span",
                          "text": `(${stockChangepct}) `,
                          "size": "lg",
                          "weight": "bold"
                        },
                        {
                          "type": "span",
                          "text": ` ${stockChange} today`
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "text",
                  "text": `PE = ${stockPe}`,
                  "margin": "sm",
                  "contents": []
                },
                {
                  "type": "separator",
                  "margin": "lg"
                },
                {
                  "type": "text",
                  "text": "ข้อมูลราคาไม่ได้มาจากทุกตลาด และอาจล่าช้าได้ถึง 20 นาที และมีวัตถุประสงค์เพื่อแจ้งให้ทราบเท่านั้น ไม่ใช่เพื่อการซื้อขายหรือเสนอแนะ",
                  "size": "xxs",
                  "color": "#1F1F1FFF",
                  "margin": "lg",
                  "wrap": true,
                  "contents": []
                }
              ]
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "button",
              "action": {
                "type": "uri",
                "label": "Google Finance",
                "uri": stockButtonUrl
              },
              "margin": "none"
            }
          ]
        }
      };
}

function setFlexMessageForStockToken(stock) {
    return lineTemplate.flexMessageTemplate(
        `Stock Token : ${stock[0].split(":")[1]}`, 
        setStockTokenPlanFlexMessage(stock)
    );
}

module.exports = { 
    setStockTokenPlanFlexMessage,
    setFlexMessageForStockToken 
};