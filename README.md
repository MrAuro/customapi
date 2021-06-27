# customapi

## Routes

### /youtube/

#### /youtube/latest/:channelid

Returns the latest video from a channel by ID

linkOnly?: Should the response be the link? (Boolean) [defaults false]

### /friday/

#### /

Returns the query string or true if the day is friday

response?: What should the response be if the day of the week is friday? (String) [defaults response is true or false];

### /twitter/

#### /latest/:username

Returns the latest tweet and URL of a twitter account

noping?: Should any words with @'s use a zero width character to prevent pings? [defaults false]

### /time/

#### /conversion/:milliseconds

Returns a human readable string from milliseconds

long?: Should the response be in long form (hours instead of h) (Boolean) [defaults false]

### /twitch/

#### /chatters/all/:channel

Returns all the chatters in a specified channel

#### /chatters/random/:channel

Returns a random chatter in a specified channel
