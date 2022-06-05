const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/dynamicWebsite")
  .then(() => {
    console.log("db connected");
  })
  .catch((e) => {
    console.log("not db connected");
  });
