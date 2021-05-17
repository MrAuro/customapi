const router = require('express').Router();
const axios = require('axios');

require('dotenv').config();

// TODO: Allow for different options, like link only, show the channel, title quotes, etc

/*
        /youtube/latest/
        Returns the latest video from a channel by ID

       channelid: The channel ID of the channel                         [required]

       linkOnly?: Should the response be the link?                      [defaults false]
*/
router.route('/latest/:channelid').get((req, res) => {
    axios
        .get(`https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_KEY}&channelId=${req.params.channelid}&part=snippet,id&order=date&maxResults=1`)
        .then((resp) => {
            if (req.query?.linkOnly === 'true') {
                res.json(`https://youtu.be/${resp.data.items[0].id.videoId}`);
            } else {
                res.json(`"${resp.data.items[0].snippet.title}" | https://youtu.be/${resp.data.items[0].id.videoId}`);
            }
        })
        .catch((err) => {
            if (err.response.data.error.code == 400) {
                res.sendStatus(400);
            } else {
                res.sendStatus(500);
            }
        });
});

module.exports = router;
