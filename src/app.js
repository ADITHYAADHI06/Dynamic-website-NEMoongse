// we are creating backend ** that how navigation is working..
// and in this creating sever in app.js.

const express = require("express");
const { dirname } = require("path");
const app = express();

// in this app, contains all methods in expresJs we can use app for
//  all express methods

// we have required database in this line
require("./db/connection");
const path = require("path");

// static website
const static_path = path.join(__dirname, "../public");
// console.log(static_path);
// middleWare
app.use(express.static(static_path));

// we are seting the path to css
app.use(
  "/css",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
);
app.use(
  "/jq",
  express.static(path.join(__dirname, "../node_modules/jquery/dist"))
);

// dynamic website
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
app.set("view engine", "hbs");
// seting the views
app.set("views", template_path);
// to use partials
const hbs = require("hbs");
hbs.registerPartials(partials_path);

const User = require("./models/userMsg");
const async = require("hbs/lib/async");
const PORT = process.env.PORT || 3000;

// Routing
// app.get(path,callback);
app.get("/", (req, res) => {
  res.render("index");
});

// app.get("/contact", (req, res) => {
//   res.render("contact");
// });

// to get the value from the website
// we must include this middleware
app.use(express.urlencoded({ extended: false }));
app.post("/contact", async (req, res) => {
  try {
    // res.send(req.body);
    // saveing the Data in Database with line
    const UserData = new User(req.body);
    await UserData.save();
    res.status(201).render("index");
  } catch (e) {
    res.status(500).send(e);
  }
});

// server
app.listen(PORT, () => {
  console.log(`server runnig on ${PORT}`);
});
// port is used for , when we are deplyed our webapp internet , we don't have idea about
// in which port our app is deployed. so we can't staticly write the port number.
