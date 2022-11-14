// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {
  console.log("script 2 is working!");

  //loop through the data to create many tweets
  const renderTweets = function (tweets) {
    let data = tweets[0];
    console.log(`tweetsnot0`, tweets);
    let $container = $("#tweets-container").html("");
    for (let tweet in tweets) {
      let $tweet = createTweetElement(tweets[tweet]);
      $("#tweets-container").append($tweet);
    }

    return $("#tweets-container");
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
    <p class="user-name">${tweet.user.name}</p>
  </div>
  <p class="tweeter-handle">${tweet.user.handle}</p>
  </header>

  <div class="tweet-content">
  <p class="tweet-words">
    ${tweet.content.text}
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

  //Stop normal form submission
  $('form').on('submit', event => {
    event.preventDefault();
    let data = $('form').serialize();
    console.log('DATA', data);
    $.ajax({
      url: "/tweets",
      method: "POST",
      data
    });
  });

  //Load tweets from Database
  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      action: "GET"
    })
    .then((data) => {
      renderTweets(data);
    });
  }

  return loadTweets();
});
