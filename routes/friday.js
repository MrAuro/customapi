const router = require('express').Router();
const axios = require('axios');

require('dotenv').config();

/*
        /friday/
        Returns the latest video from a channel by ID

        response?: What should the response be?                      [defaults "true" if day is friday]
*/
router.route('/').get((req, res) => {
    d = new Date();
    utc = d.getTime() + d.getTimezoneOffset() * 60000;
    nd = new Date(utc + 3600000 * '-4');

    // Friday = 5
    if (nd.getDay() == 5) {
        res.json(`${req.query?.response ? req.query.response.replace('%20', '  ') : true}`);
    } else {
        res.json(`${req.query?.response ? '' : false}`);
    }
});

module.exports = router;
