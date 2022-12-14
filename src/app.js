require("module-alias/register");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const expressFileUpload = require("express-fileupload");

require("dotenv").config({ path: "./.env" });

let environmentData = require("./envVariables")();

if (!environmentData.success) {
  console.log(
    "Server could not start . Not all environment variable is provided"
  );
  process.exit();
}

require("@configs");

const app = express();

// Health check
require("@health-checks")(app);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true, limit: "50MB" }));
app.use(bodyParser.json({ limit: "50MB" }));

app.use(express.static("public"));
app.use(expressFileUpload());
//  app.get(process.env.API_DOC_URL, function (req, res) {
//      res.sendFile(path.join(__dirname, './api-doc/index.html'))
//  })

/* Logs request info if environment is not development*/
if (process.env.ENABLE_LOG === "true") {
  app.all("*", (req, res, next) => {
    console.log("***visual-knowledgebase-service Logs Starts Here***");
    console.log(
      "%s %s on %s from ",
      req.method,
      req.url,
      new Date(),
      req.headers["user-agent"]
    );
    console.log("Request Headers: ", req.headers);
    console.log("Request Body: ", req.body);
    console.log("Request Files: ", req.files);
    console.log("***visual-knowledgebase-service Logs Ends Here***");
    next();
  });
}

/* Registered routes here */
require("./routes")(app);

// Server listens to given port
app.listen(process.env.APPLICATION_PORT, (res, err) => {
  if (err) {
    onError(err);
  }
  console.log("Environment: " + process.env.APPLICATION_ENV);
  console.log(
    "Application is running on the port:" + process.env.APPLICATION_PORT
  );
});

// Handles specific listen errors with friendly messages
function onError(error) {
  switch (error.code) {
    case "EACCES":
      console.log(
        process.env.APPLICATION_PORT + " requires elevated privileges"
      );
      process.exit(1);
    case "EADDRINUSE":
      console.log(process.env.APPLICATION_PORT + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}
