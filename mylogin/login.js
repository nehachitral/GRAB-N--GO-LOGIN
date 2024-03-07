const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
const port = 3000; // You can change the port number if needed

// Connection URI
const uri = "mongodb://localhost:27017";

// Connect to MongoDB
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());

client
  .connect()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Body parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle the login form submission
app.post("/login", async (req, res) => {
  const email = "C Neha"; //req.body.email;
  const password = "neha";  //req.body.password;
  console.log(email, password);

  try {
    // Get the "Login" database
    const database = client.db("Login");
    // Get the "collection1" collection
    const collection = database.collection("collection1");

    // Find user in the collection
    const user = await collection.findOne({ name: email, password: password });
    console.log(user);

    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send("Login successful!");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
