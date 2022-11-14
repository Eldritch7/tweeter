$(document).ready(function () {
  $(".tweet-text").on("input", function (event) {
    //targeting the text area and getting it's length
    const charMax = 140;
    let charCount = $(this).val().length;
    let remainingChars = charMax - charCount;
    //finding the counter element and passing it remainingChars as it's text
    let counter = $(this).parent().find(".counter");
    counter.text(remainingChars);

    //change characters over 140 to red:
    if (remainingChars < 0) {
      counter.addClass("turnRed");
    } else {
      counter.removeClass("turnRed");
    }
  });
});
