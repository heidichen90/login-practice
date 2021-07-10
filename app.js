const express = require("express");
const app = express();
const exhbs = require("express-handlebars");
require("./config/mongoose");

const PORT = 3000;

//set up  handlebars as a view engine
app.engine("hbs", exhbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

//set up body parser
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/login", (req, res) => {
  const loginDetail = req.body;
  console.log(req.body);
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
