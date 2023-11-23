const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
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

const addCity = (city, temperature, label = "") => {
  const data = getHistory();
  const date = new Date().toLocaleDateString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  const id = crypto.randomUUID();
  const el = { id: id, city: city, temperature: temperature, date: date, label: label};
  data.push(el);
  save(data);
};

const getContact = () => {
  if (!fs.existsSync(contactsPath)) {
    fs.writeFileSync(contactsPath, "[]");
  }
  return JSON.parse(fs.readFileSync(contactsPath, "utf8"));
}

module.exports = { save, getHistory, addCity };
