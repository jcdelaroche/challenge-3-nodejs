const fs = require("fs");
const path = require("path");
const historyPath = path.join(__dirname, "..", "data", "history.json");

const save = (data) => {
  fs.writeFileSync(historyPath, JSON.stringify(data));
};

const getHistory = () => {
  if (!fs.existsSync(historyPath)) {
    fs.writeFileSync(historyPath, "[]");
  }
  return JSON.parse(fs.readFileSync(historyPath, "utf8"));
};

const addCity = (city, temperature) => {
  const data = getHistory();
  const date = new Date().toLocaleDateString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  const el = { city: city, temperature: temperature, date: date};
  data.push(el);
  save(data);
};

module.exports = { save, getHistory, addCity };
