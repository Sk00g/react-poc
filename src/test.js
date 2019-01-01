const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/test");

var db = mongoose.connection;
db.on("error", () => console.log("error"));
db.once("open", () => {
  console.log("connection opened...");

  var partSchema = new mongoose.Schema({
    name: String
  });

  var partModel = mongoose.model("Part", partSchema);

  console.log("partModel: " + partModel);
});
