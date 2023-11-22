const express = require('express');
const path = require('path');
const {getMeteo} = require('projet-meteo');
const fs = require('fs').promises;

const {getHistory, save, isEmpty} = require('./utils');
const { log } = require('console');

const app = express();

app.use(express.urlencoded({ extended: true }));

const viewsPath = path.join(__dirname, '..', 'views');

app.use(express.static(path.join(__dirname, '..', 'views')));

app.set("view engine", "hbs");
app.set("views", viewsPath);

app.get('', (req, res) => {
    
    // try {
    //     const city = 'Paris';
    //     const meteo = await getMeteo(city);
    //     res.render('home', {
    //         city: city,
    //         temperature: meteo.temperature_2m,
    //     });
    //     const data = getHistory();
    //     data.push({ city: city, temperature: meteo.temperature_2m })
    //     save(data);
    // } catch (error) {
    //     console.error('Error:', error);
    //     res.status(500).send('Internal Server Error');
    // }

    // display last city and its temperature from history file 
    const data = getHistory();
    console.log(isEmpty(data));
    const lastItem = data[data.length - 1];
    res.render('home', {
        city: lastItem?.city ?? "",
        temperature: lastItem?.temperature ?? ""
    });

});

app.post("/addCity", async (req, res) => {
    console.log(req.body);
    const { city } = req.body;
    try {
        const data = getHistory();
        console.log('data', data);
        console.log('city :', city);
        const meteo = await getMeteo(city);
        console.log('meteo : ', meteo);
        const temperature = meteo.temperature_2m;
        console.log('temperature :', temperature);
        const el = { city: city, temperature: temperature}
        data.push(el)
        save(data);

        res.redirect('/')
        console.log('The "data to append" was appended to file!');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    } 
})

app.get('/about', (req, res) => {
    try {
        const repos = fetch(`https://api.github.com/users/gpulch/repos`)
        .then((res) => res.json())
      .then((data) => data)
      .catch((error) => {
        console.log("Error caught fetching api");
        console.log(error);
        return "error";
      });
    res.render('about', {
        repos: repos,
    });

app.get('*', (req, res) => {
    res.send("404 - Page not found - boloss");
}
);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    }
);
