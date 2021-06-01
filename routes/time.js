const router = require('express').Router();
const axios = require('axios');

const auroMs = require('auro-ms-conversion');

require('dotenv').config();

/*
        /time/conversion/:milliseconds
        Converts miliseconds to human readble text

        long?: Should the response be in long form? (hours instead of h)                      [defaults "true"]
*/
router.route('/conversion/:milliseconds').get((req, res) => {
    if(!req.params.milliseconds) return res.json(`Missing milliseconds`).sendStatus(400)

    if(req.query?.long === 'true') {
        return res.json(auroMs.relativeTime(parseInt(req.params.milliseconds), true));
    } else { 
        return res.json(auroMs.relativeTime(parseInt(req.params.milliseconds), false));
    }
});

module.exports = router;
