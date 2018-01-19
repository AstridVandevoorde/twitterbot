var config = require('./config.js');
var twitter = require('twitter');
var express = require("express");
var app = express();
var tweetsdata = [];
var T=new twitter(config);
/* serves main page */
app.get("/", function(req, res) {
   res.sendfile('index.html');
});

app.get("/getdata", function(req, res) {
  res.send(data2send);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
 
});
    
var params = {
  q: '#AI',
  count: 10,
  result_type: 'recent',
  lang: 'en'
};

T.get('search/tweets', params, function(err, data, response) {
  /* If there is no error, proceed*/
  if(!err){
      for(let i = 0; i < data.statuses.length; i++){
         tweetsdata.push(data.statuses[i].text);
        //console.log(tweetsdata[i]);
      }
  }
});

/*const options = {
  maxLength: 140,
  minWords: 10,
  minScore: 25,
  checker: sentence => {
    return sentence.endsWith('.');
  }
};*/
const Markov = require('markov-strings');
const markov = new Markov(tweetsdata);
markov.buildCorpus().then(() => {
 
    var tweets = [];
    for (let i = 0; i < tweetsdata.length; i++) {
      markov.generateSentence()
        .then(result => {
          tweets.push(result);
          console.log(result);
        });
    }
     });
 


