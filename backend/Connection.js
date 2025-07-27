const mongoose = require("mongoose");
const MongodbConnection = (url) => {
  mongoose
    .connect(url)
    .then(() => console.log("Mongodb Connected!!"))
    .catch((error) => console.log("Error: ", error));
};
module.exports = MongodbConnection;