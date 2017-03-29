const express = require('express');
const app = express();
// To share files from public folder
app.use(express.static('public'));



app.listen(5000, () => {
    console.log('Server is listening port 5000');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/public/index.html');
});

app.get('/messages', (req, res) => {

});