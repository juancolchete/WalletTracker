var express = require('express');
var axios = require('axios');
var session = require('express-session');
require('dotenv').config()


var app = express();
app.use(express.json());
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
var sess;

app.get('/', function (req, res) {
    res.send("Hello World");
});

app.get('/user', function (req, res) {
    res.send("Hello " + req.query.name);
});


app.get('/bnb', async function (req, res) {

    response = await axios.get("https://api.bscscan.com/api"+
                                "?module=account"+
                                "&action=balance"+
                                "&address="+req.query.address+
                                "&apikey="+process.env.APIKEY)
    res.send(response.data);
});

app.post('/post', function (req, res) {
    res.send(req.body);
})

app.post('/session', function(req,res){
    sess = req.session;
    sess.email = req.body.email;
    res.send(req.session);
})

app.listen(3000);