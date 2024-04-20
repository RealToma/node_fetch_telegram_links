const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const { default: axios } = require("axios");
const fs = require("fs");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(cors());

app.get("/", (req, res) => {
  const linkfile = fs.readFileSync("./resource/totalResult.txt");
  return res.json({ data: linkfile.toString() });
});
app.get("/latestlink", (req, res) => {
  if (!fs.existsSync("./resource/latest.txt")) {
    fs.writeFile("./resource/latest.txt", "0", { overwrite: true }, function (err) {
      if (err) throw err;
    });
  }
  const linkfile = fs.readFileSync("./resource/latest.txt");
  return res.json({ data: linkfile.toString() });
});
app.post("/latestlink", (req, res) => {
  fs.writeFile("./resource/latest.txt", req.body.next.toString(), { overwrite: true }, function (err) {
    if (err) {
      res.json({ state: "fail" });
      throw err;
    }
    return res.json({ state: "success" });
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`listening on ${PORT}`));
