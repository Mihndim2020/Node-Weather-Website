const path = require("path");
const express = require("express");
const hbs = require("hbs");
require("dotenv").config();

const geocode = require("./utils/geocode");
const forecasts = require("./utils/forecasts");

const app = express();
const port = 8080;

// Define paths for express config
const publicDirectory = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath); // configure the path were partials are registered

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("/", (req, res) => {
  res.render("index", {
    title: "The weather app",
    name: "Mih Julius Ndim",
  }); // express will automatically look for it in the view folder
  // res.send("<h1> Weather </h1>");
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Mih Julius",
    content: "Welcome to our help page",
  });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "The about me page", name: "Mih Julius Ndim" });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please you must provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { longitude, latitude, place_name } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecasts(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          forcast: forecastData.weather,
          location: place_name,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404Error", {
    title: "Help error page",
    name: "Mih Julius Ndim",
    content: "The help you need is not available at the moment", // A good name will be erorr message
  });
});

app.get("*", (req, res) => {
  res.render("404Error", {
    title: "404Error page",
    name: "Mih Julius Ndim",
    content:
      "The page you are looking for is not available at the moment, please try again later",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`The server is listening on port ${process.env.PORT}`);
});
