// Use the dotenv package, to create environment variables
require("dotenv").config();
const express = require("express");

// Import cors
const cors = require("cors");

// Require morgan and body-parser middleware
const bodyParser = require("body-parser");
const morgan = require("morgan");

const apiRouter = require("./api");

// Import the client from your db/index.js
const { client } = require("./db/index");

// Create a constant variable, PORT, based on what's in process.env.PORT or fallback to 3000
const PORT = process.env.PORT || 3002;

// Import express, and create a server
const server = express();
server.use(express.urlencoded({ extended: true }));

// Have the server use bodyParser.json()
server.use(bodyParser.json());

// Have the server use morgan with setting 'dev'
server.use(morgan("dev"));

// Have the server use cors()
server.use(cors());

// Have the server use your api router with prefix '/api'
server.use("/api", apiRouter);

// Create custom 404 handler that sets the status code to 404.
server.use((req, res, send) => {
  res.status(404);
  res.send("No Route");
});

// Create custom error handling that sets the status code to 500
// and returns the error as an object
server.use((error, req, res, send) => {
  res.status(500);
  res.send(error);
});

// Start the server listening on port PORT
server.listen(PORT, () => {
  client.connect();
  console.log("The server is up on port", PORT);
});

// On success, connect to the database
