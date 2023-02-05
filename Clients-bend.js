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

// Log an error if there is a problem connecting to the database
db.on("error", console.error.bind(console, "connection error:"));
// Log a message if the connection is successful
db.once('open',()=>{
  console.log('You have been connectd succssfully')
})


// Define a user schema for the MongoDB collection
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
const User = mongoose.model("Client", userSchema);

// Handle a POST request to the form the Client
app.post("/asClient", (req, res) => {
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
        res.sendFile(path.join(__dirname,"samplehome.html"));
      })
      .catch(error => {
        res.status(400).send({ error });
      });

});
app.get("/",(req,res) =>{
  res.json({message:"Welcome"})
})
// Start the Express server on port 8081
app.listen(1000, () => {
    console.log("Server started on http://localhost:1000");
});
