const express = require('express');
const app = express();
// To share files from public folder
app.use(express.static('public'));

const express = require('express');
const app = express();

app.enable('trust proxy');

// Add a handler to inspect the req.secure flag (see 
// http://expressjs.com/api#req.secure). This allows us 
// to know whether the request was via http or https.
// https://github.com/aerwin/https-redirect-demo/blob/master/server.js
app.use ((req, res, next) => {
  if (req.secure) {
    // request was via https, so do no special handling
    next();
  } else {
    // request was via http, so redirect to https
    res.redirect('https://' + req.headers.host + req.url);
  }
});


app.listen(5000, () => {
    console.log('Server is listening port 5000');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/public/index.html');
});

app.get('/messages', (req, res) => {

});