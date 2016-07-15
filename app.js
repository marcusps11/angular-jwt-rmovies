var express = require('express');
var faker = require('faker');
var cors = require('cors');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var jwtSecret = 'hello';

var user = {
	username:'marcus',
	password:'p'
} 

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(expressJwt({secret: jwtSecret}).unless({ path: ['/login']}));

app.get('/random', function(req, res) {
	var user = faker.helpers.createCard()
	res.json(user);
});

app.get('/me', function(req, res) {
	res.send(req.user)
});

app.post('/login', authenticate, function(req, res) {

	var token = jwt.sign({
		username: user.username
	}, jwtSecret);

	res.send({
		token:token,
		user:user
	})
})

app.listen('3000', function() {
	console.log('listenting on port 3000');
})

function authenticate(req, res, next) {
	console.log('called')

	var body = req.body;
	console.log(body)
	if(!body.username || !body.password) {
		res.status(400).end('Must provide username or password')
	}
	if(body.username !== user.username  || body.password !== user.password) {
		res.status(401).end('wrong username and password')
	}
	next();

}