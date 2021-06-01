const router = require('express').Router();
const axios = require('axios');
const Twit = require('twit');

require('dotenv').config();

let T = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
    strictSSL: true, // optional - requires SSL certificates to be valid.
});

/*
        /twitter/latest/
        Returns the latest tweet from a channel by username

       username: The username of the channel                                           [required]

       noping?: Should any words with @'s use a no width character to prevent pings?   [defaults false]
*/
router.route('/latest/:username').get((req, res) => {
    // Check if there is a username that fits the regex
    let targetUser = req.params.username.match(/(^|[^@\w])(\w{1,15})\b/);
    if (!targetUser) return req.json('Invalid username');

    // Use Twit to fetch the twiter api
    T.get('search/tweets', { q: `from:${req.params.username}`, count: 1, tweet_mode: 'extended', attachment_url: true }, function (err, data, response) {
        if (response.statusCode != 200) return res.sendStatus(response.statusCode);
        if (data.statuses.length == 0) return res.json('');

        if (req.query?.noping === 'true') {
            // Zero width character to prevent pings
            let zeroWidth = '󠀀';

            let latestTweet = data.statuses[0].full_text;
            let re = /@[A-z]{2}/gi;
            let cleanedTweet = latestTweet
                .replace(re, function (match, token) {
                    return match[0] + match[1] + zeroWidth + match[2];
                })
                .replace(/\n/g, ' ');
            res.json(`${cleanedTweet} | https://twitter.com/${data.statuses[0].user.screen_name}/status/${data.statuses[0].id_str}`);
        } else {
            let latestTweet = data.statuses[0].full_text.replace(/(\n)/g, ' ');
            res.json(`${latestTweet} | https://twitter.com/${data.statuses[0].user.screen_name}/status/${data.statuses[0].id_str}`);
        }
    });
});

module.exports = router;
