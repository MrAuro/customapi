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
