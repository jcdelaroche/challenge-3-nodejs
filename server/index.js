const express = require("express");
const path = require("path");
const { getMeteo } = require("projet-meteo");

const { getHistory, addCity, save } = require("./utils");

const app = express();

app.use(express.json());

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
    history: data?.reverse().slice(0, 5) ?? "",
  });
});

app.post("/addCity", async (req, res) => {
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

app.post("/deleteCity", async (req, res) => {
  const { city } = req.body;
  try {
    const data = await getHistory();
    const newData = data.filter((el) => el.city !== city);
    save(newData);
    res.redirect("/");
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
      firstRepos: reposGithub[0],
      repos: reposGithub,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("*", (req, res) => {
  res.send("404 - Page not found - boloss");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
