const express = require("express");
const path = require("path");
const { getMeteo } = require("projet-meteo");

const { getHistory, save, addCity } = require("./utils");
const { log } = require("console");

const app = express();

app.use(express.urlencoded({ extended: true }));

const viewsPath = path.join(__dirname, "..", "views");

app.use(express.static(path.join(__dirname, "..", "views")));

app.set("view engine", "hbs");
app.set("views", viewsPath);

app.get("", (req, res) => {
  // display last city and its temperature from history file
  const data = getHistory();
  const lastItem = data[data.length - 1];
  res.render("home", {
    city: lastItem?.city ?? "",
    temperature: lastItem?.temperature ?? "",
    history: data.reverse().slice(0, 5),
  });
});

app.post("/addCity", async (req, res) => {
  console.log(req.body);
  const { city } = req.body;
  try {
    const meteo = await getMeteo(city);
    const temperature = meteo.temperature_2m;
    addCity(city, temperature);

    res.redirect("/");
    console.log('The "data to append" was appended to file!');
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/about", async (req, res) => {
  try {
    let reposGithub = [];
    const response = await fetch(`https://api.github.com/users/gpulch/repos`);

    if (!response.ok) {
      throw new Error(
        `GitHub API request failed with status: ${response.status}`
      );
    }

    const data = await response.json();
    console.log(data);
    reposGithub = data.map((repo) => repo);

    res.render("about", {
      repos: reposGithub,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("*", (req, res) => {
  res.send("404 - Page not found - boloss");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
