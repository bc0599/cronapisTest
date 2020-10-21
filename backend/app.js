let express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  dataBaseConfig = require('./database/db');
  

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://gatitos999:gatitos999@appcluster-shard-00-00.mhyt0.mongodb.net:27017,appcluster-shard-00-01.mhyt0.mongodb.net:27017,appcluster-shard-00-02.mhyt0.mongodb.net:27017/appcluster?ssl=true&replicaSet=atlas-rshq9t-shard-0&authSource=admin&retryWrites=true&w=majority",
{ useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Database connected sucessfully ')
},
  error => {
    console.log('Could not connected to database : ' + error)
  }
)

const userRoute = require('../backend/routes/routes.route')

//passport
var passport=require('passport');
var session=require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  name: 'myname.sid',
  resave:false,
  saveUninitialized:false,
  secret:'secret',
  cookie:{
    maxAge:3600000,
    httpOnly:false,
    secure:false
  },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

require('./passport-config')

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: ['http://localhost:8100', 'http://127.0.0.1:8100'],
  credentials: true
}));

// RESTful API root
app.use('/api', userRoute)

// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('PORT Connected on: ' + port)
})

var createError = require('createerror');

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});