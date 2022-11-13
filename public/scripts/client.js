/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {
  console.log("script 2 is working!");
  //Hardcoded temp data
  const tweetData = {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  };

  const dataBig = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];
  //Function to Interpret created_at timestamp
  const xTimeAgo = function(date) {
    let seconds = Math.floor((new Date() - date) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  };

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
    <p>${xTimeAgo(tweet.created_at)}</p>
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

  return renderTweets(dataBig);
});
