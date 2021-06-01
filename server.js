const express = require('express');
const cors = require('cors');
const rateLimiter = require('express-rate-limit');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);
app.use(cors());
app.use(express.json());

const youtubeRouter = require('./routes/youtube');
const fridayRouter = require('./routes/friday');
const twitterRouter = require('./routes/twitter');

app.get('/', (req, res) => {
    res.sendStatus(200);
});

app.use('/youtube', youtubeRouter);
app.use('/friday', fridayRouter);
app.use('/twitter', twitterRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
