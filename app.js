const express = require("express");
const app = express();
const exhbs = require("express-handlebars");
const Login = require("./models/login");
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
  Login.find({ email: loginDetail.email })
    .lean()
    .then((result) => {
      const user = result[0];
      var error = "";
      if (result.length === 0) {
        error = "Unable to find user name";
        res.render("index", { error });
      }
      if (loginDetail.password === user.password) {
        res.render("welcome", { userName: user.firstName });
      } else {
        error = "wrong password, please try it again";
        res.render("index", { user, error });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
