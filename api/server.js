const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./src/routes");
const path = require("path");
const logger = require("./src/logger");
// App
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", routes);
app.use("/assets", express.static(path.join(__dirname, "assets")));

const PORT = 3001;
app.listen(PORT, () => logger.info("Server is up!!"));
logger.info("Running on http://localhost:" + PORT);
logger.error("NOT AN ACTUAL ERROR: Created error log.");
