const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const apiKey = "1af1f5ff135aafba29a57f8b9dc29e5a";
  const query = req.body.askUser; //name of the Input and not the ID of the input
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    units;

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const cityName = weatherData.name;
      const weatherID = weatherData.weather[0].icon;
      const icon = "http://openweathermap.org/img/wn/" + weatherID + "@2x.png";
      console.log(description);

      res.write(
        "<h1>The Temperatur in " +
          cityName +
          " is " +
          temp +
          " degree Celcius<h1>"
      );
      res.write(
        "<h3>The weather in " +
          cityName +
          " is currently " +
          description +
          "<h3>"
      );
      res.write("<img src=" + icon + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
