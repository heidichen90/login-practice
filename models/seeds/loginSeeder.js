const db = require("../../config/mongoose");
const Login = require("../login");
const mockData = require("../../mock_data/user.json");

db.once("open", () => {
  Login.create(mockData.usersSeeds)
    .then(() => {
      console.log("user seeder done!");
      db.close();
    })
    .catch((error) => {
      console.log(error);
    });
});
