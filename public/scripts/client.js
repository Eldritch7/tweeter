// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function () {
  //loop through the data to create many tweets
  const renderTweets = function (tweets) {
    let data = tweets[0];

    let $container = $("#tweets-container").html("");
    for (let tweet in tweets) {
      let $tweet = createTweetElement(tweets[tweet]);
      $("#tweets-container").prepend($tweet);
    }

    return $("#tweets-container");
  };

  //Escape Function
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //Create one tweet element
  const createTweetElement = function (tweet) {
    let $tweet = `<article class="tweet">
<header>
  <div class="user">
    <img
      class="avatar"
      src=${tweet.user.avatars}
      alt="avatar-img"
    />
    <p class="user-name">${escape(tweet.user.name)}</p>
  </div>
  <p class="tweeter-handle">${escape(tweet.user.handle)}</p>
  </header>

  <div class="tweet-content">
  <p class="tweet-words">
    ${escape(tweet.content.text)}
  </p>
</div>


<footer>
  <div class="time-stamp">
    <p>${timeago.format(tweet.created_at)}</p>
  </div>
  <div class="icons">
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>
  </div>
</footer>
</article>

`;

    return $tweet;
  };

  //Form Submission Logic
  $("form").on("submit", (event) => {
    event.preventDefault();
    let data = $("form").serialize();
    let $tweetText = $("textarea").val();
    let $tweetLength = $tweetText.length;
    if ($tweetText.length > 140) {
      $(".error-message").slideDown();
      $(".error-message").text("⛔ Tweet can't exceed 140 characters");
      //reloadPage();
      return false;
    } else if (!$tweetText) {
      $(".icon").slideDown();
      $(".error-message").slideDown();
      $(".error-message").text("⛔ Type in some thoughts :)");
      return false;
    }

    $.ajax({
      url: "/tweets",
      method: "POST",
      data,
    }).then(() => {
      reloadPage();
    });
  });

  const reloadPage = function () {
    $(".error-message").slideUp();
    $("textarea").val("");
    $(".counter").text(140);
    loadTweets();
  };

  //Load tweets from Database
  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      action: "GET",
    }).then((data) => {
      renderTweets(data);
    });
  };

  return loadTweets();
});
