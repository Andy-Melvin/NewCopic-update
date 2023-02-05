const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const path = require("path");
mongoose.set('strictQuery', false);
const app = express();

// Connect to the MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/CopicDB",{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use body-parser middleware to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Defining a connection to the MongoDB database
const db = mongoose.connection;

// Logging an error if there is a problem connecting to the database
db.on("error", console.error.bind(console, "connection error:"));
// Logging a message if the connection is successful
db.once('open',()=>{
  console.log('You have been connectd succssfully')
})


// Defining a user schema for the MongoDB collection
const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
});

// Create a Mongoose model for the user schema
const User = mongoose.model("Photographer", userSchema);

// Handle a POST request from the Photographer
app.post("/sign-up-as-photographer", (req, res) => {
    // Get the user data from the request body
    const userData = req.body;


    // Validate the user data
    if (userData.password !== userData.confirmPassword) {
      res.status(400).send({ error: "Passwords do not match"});
      return;
    }

    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(userData.password, saltRounds);
    userData.password = hashedPassword;

    // Create a new user
    const newUser = new User(userData);
    // Save the new user to the database
    newUser
      .save()
      .then(() => {
        // Send the success.html file to the client
        res.sendFile(path.join(__dirname,"HOME.html"));
      })
      .catch(error => {
        res.status(400).send({ error });
      });
});

/////////////////////////////////////////////////////////////////Go ask how to check for the existance of a user in more than one table

//login route .
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }, (error, user) => {
    if (error) {
      res.status(500).send({ error });
      return;
    }

    if (!user) {
      res.status(404).send({ error: "User not found" });
      return;
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      res.status(401).send({ error: "Incorrect password" });
      return;
    }

    res.sendFile(path.join(__dirname, "HOME.html"));
  });

});

// Start the Express server on port 1000
app.listen(1000, () => {
    console.log("Server started on http://localhost:1000");
});
