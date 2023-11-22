async function getWeather({lat, lon} = {lat: 48.8534, lon: 2.3488}) {
    try{
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation_probability`);
        return res.json();
    } catch (err) {
        console.error(err);
    }
}

module.exports = getWeather;