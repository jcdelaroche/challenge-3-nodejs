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

const isEmpty = () => {
  if(getHistory.length === 0) true;
};

module.exports = { save, getHistory, isEmpty };
