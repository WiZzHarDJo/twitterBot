const twit = require('twit');
require('dotenv/config');

const config ={  
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
}

const Twitter = new twit(config);


// post a tweet with media
function getImage(){

var request = require('request').defaults({ encoding: null });

request.get('https://source.unsplash.com/random?poetry', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        bob = new Buffer.from(body).toString('base64');
        console.log(bob)
        Twitter.post('media/upload', { media_data: bob }, function (err, media, response) {
          // now we can assign alt text to the media, for use by screen readers and
          // other text-based presentations and interpreters
          console.log(media)
              // now we can reference the media and post a tweet (media will attach to the tweet)
              var params = { status: ' ', media_ids: media.media_id_string }           
              Twitter.post('statuses/update', params, function (err, tweet, response) {
                console.log(tweet)
              })
            }) 
        }
      })
}

//getImage();
setInterval(getImage, 7200000);
