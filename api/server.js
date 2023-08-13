const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./src/routes");
const path = require("path");

// App
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", routes);
app.use("/assets", express.static(path.join(__dirname, "assets")));

const PORT = 3001;
app.listen(PORT, () => console.log("Server is up!!"));
console.log("Running on http://localhost:" + PORT);
