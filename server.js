const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

const port = process.env.PORT || 7000;

//https.createServer({
//  key: fs.readFileSync('my_cert.key'),
//  cert: fs.readFileSync('my_cert.crt'),
//  rejectUnauthorized: false
//}, app).listen(port, function(){
//  console.log("My HTTPS server listening on port " + port + "...");
//});

app.get('/foo', function(req, res){
  console.log('Hello, soy HTTPS.');
});

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
