$(function() {
    'use strict';

    var prefix = "https://cors-anywhere.herokuapp.com/";
    var tweetLink = "https://twitter.com/intent/tweet?text=";
    var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
    var $quote = $('.quote');
    var $author = $('.author');
    var $tweet = $('.tweet');

    function getQuote() {
        $.getJSON(prefix + quoteUrl, createTweet);
        $.ajaxSetup({ cache: false });
    };

    function createTweet(input) {
        var data = input[0];
        var quoteText = $(data.content).text().trim();
        var quoteAuthor = data.title;
        var tweetText;

        if (!quoteAuthor.length) {
            quoteAuthor = "Unknown author";
        }

        tweetText = "Cytat dnia - " + quoteText + " Autor: " + quoteAuthor;

        if (tweetText.length > 140) {
            getQuote();
        }
        else {
            tweetText = tweetLink + encodeURIComponent(tweetText);

            $quote.text(quoteText);
            $author.text("Autor: " + quoteAuthor);
            $tweet.attr('href', tweetText);
        }
    };

    $(document).ready(function() {
        getQuote();
        $('.trigger').click(function() {
            getQuote();
        });
    });
});
