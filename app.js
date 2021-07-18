const express = require("express");
const app = express();
const exhbs = require("express-handlebars");
const Login = require("./models/login");
const cookieParser = require("cookie-parser");
require("./config/mongoose");

const PORT = 3000;

//set up  handlebars as a view engine
app.engine("hbs", exhbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

//set up cookie parser
app.use(cookieParser());

//set up body parser
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  if (req.cookies.userName && req.cookies.userEmail) {
    return res.render("welcome", { userName: req.cookies.userName });
  }
  res.render("index");
});

app.get("/logout", (req, res) => {
  res.clearCookie("userName");
  res.clearCookie("userEmail");
  res.redirect("/");
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
        //send cookie
        res.cookie("userName", user.firstName, { maxAge: 1000 * 60 * 60 * 24 });
        res.cookie("userEmail", user.email.toString(), {
          maxAge: 1000 * 60 * 60 * 24,
        });

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
