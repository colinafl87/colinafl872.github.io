
$(document).ready(() => {
  const $body = $('body');
  $body.html('');

  const $header = $('<header></header>');
  $header.html('<h1 style="background-color:rgb(212, 185, 241); text-align:center;">Twiddler</h1>');
  $header.appendTo($body);
  

  const $main = $('<main></main>');
  $main.appendTo($body);


  //these are only the first tweets, need to make another function for new tweets
  const $tweetsStart = streams.home.map((tweet) => {
    const $tweet = $('<div></div>');
    const $timestamp = $('<i class="timestamp"></i>');
    const twid = tweet.user;
    $tweet.append('<p>' + '<b>' + '@' + '<a class="user">' + twid + '</a>' + ': ' + '</b>' + tweet.message + '</p>');

    $timestamp.append(moment(tweet.created_at).fromNow() + '<br>');
    $timestamp.appendTo($tweet);

    $tweet.append('<br>');
    
    return $tweet;
  });

  const $newTweetsButton = $('<button></button>');
  $newTweetsButton.appendTo($main);
  $newTweetsButton.click(function () {
    startTwiddler();
  });
  //add visitor tweet to button area
  $main.prepend('<div id="visitor-tweet"></div>');
  $('#visitor-tweet').prepend('<header id="visitor-tweet">Your Tweet!</header>');
  $('#visitor-tweet').append('<input class="visitor-name" type="text" id="uName" placeholder="@username..." ></input>');
  $('#visitor-tweet').append('<input class="visitor-tweet" type="text" id="message" placeholder="tweet...">');
  $('#visitor-tweet').append('<button id="submitButton" class="button" type="button">submit</button>');

  //visitor tweet button function
  $("#submitButton").on("click", function () {
    streams.users[$("#uName").val()] = $("#message").val();
    const $visit = $('<div class="tweet" ></div>');
    const visitTime = new Date();

    $visit.append('<p>' + '<b>' + '@' + '<a class="user">' + $("#uName").val() + '</a>' + ": " + '</b>' + $("#message").val() +'</p>');
    $visit.append($('<p>' + '<i>'+ moment(visitTime).fromNow() + '</i>' + '</p>' + '<br>'));

    $tweets.prepend($visit);
  })
  

  const $tweets = $('<div class="tweets"></div>');
  $tweets.appendTo($main);

  function createTweet(tweet) {
    const $tweet = $('<div></div>');
    const time = ('<i>' + moment(tweet.created_at).fromNow() + '</i>' + '<br>');
    const twid = tweet.user;
    $tweet.append('<p>' + '<b>' + '@' + '<a class="user">' + twid + '</a>' + ': ' + '</b>' + tweet.message + '</p>');
    
    $tweet.append(time);

    $tweet.append('<br>');
    $tweet.appendTo($tweets);
  }

  function newTweets(tweets) {
    $tweets.html('');

    var index = tweets.length - 1;
    while (index >= 0) {
      const tweet = tweets[index];
      createTweet(tweet);
      index -= 1;
    }

    $('.user').on('click', function (event) {
      showUserTimeline(event.target.text);
    });
  }

  function showUserTimeline(user) {
    
    $newTweetsButton.text('Back');
    newTweets(streams.users[user]);
  }

  function startTwiddler() {
    $newTweetsButton.text('New Tweets');
    newTweets(streams.home);
  }

  $tweets.append($tweetsStart);
  startTwiddler();
  
});
