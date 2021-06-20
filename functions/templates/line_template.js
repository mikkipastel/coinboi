const flexMessageTemplate = (altText, flexMessageData) => ({
  type: "flex",
  altText: altText,
  contents: flexMessageData
});

const carouselTemplate = (altCarousel, allFlexMessage) => ({
  type: "flex",
  altText: altCarousel,
  contents: {
    type: "carousel",
    contents: allFlexMessage
   }
});

module.exports = { flexMessageTemplate, carouselTemplate };