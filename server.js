const fs = require("fs");
const express = require("express");
const hbs = require("hbs");

const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname + "/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + `\n`, err => {
    if (err) {
      console.log("unable to append to server.log");
    }
  });
  next();
});
// app.use((req, res, next) => {
//   res.render("maintenance.hbs");
// });

//middleware
app.use(express.static(__dirname + "/public"));


hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});
hbs.registerHelper("capitalization", text => {
  return text.toUpperCase();
});
// app.get("/", (req, res) => {
// response.send ('<h1>Hello Express!</h1>');
//   res.send({
//     name: "Andre",
//     likes: ["BIKING", "CITIES"]
//   });
app.get("/", (req, res) => {
  res.render("index.hbs", {
    pageTitle: "Home Page",
    currentYear: new Date().getFullYear(),
    welcomeMessage: "Bem vindo ao Ola Mundo!"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Bad Request"
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
