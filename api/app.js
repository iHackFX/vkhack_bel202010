// Подключим внешние зависимости из node_modules.
// Каждая библиотека возвращает некоторый объект через module.exports, точно так
// же, как мы это сделали в models.js. Функция require динамически находит
// модуль, исполняет его код и возвращает его module.exports нам.
const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3");
const axios = require("axios");

let db = new sqlite3.Database("./api/data.db", (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE IF NOT EXIST TABLE "conversations" (
            "id"	INTEGER NOT NULL UNIQUE,
            "chat_id"	INTEGER NOT NULL,
            "name"	TEXT NOT NULL,
            "creator_id"	INTEGER NOT NULL,
            "invite"	TEXT NOT NULL,
            "location"	TEXT NOT NULL,
            PRIMARY KEY("id" AUTOINCREMENT)
        );`,
      (err) => {
        if (err) {
          // Table already created
        }
      }
    );
  }
});

class Application {
  constructor() {
    this.expressApp = express();
    this.attachRoutes();
    this.tokenVK = "Ваш токен"; // <----------
  }

  attachRoutes() {
    let app = this.expressApp;
    let jsonParser = bodyParser.json();

    var chat_id = null;
    var invite = null;
    app.get("/getConversations", this.getConversations.bind(this));
    app.get("/createConversation", async (req, res) => {
      let creator_id = req.query.creator_id;
      let location = req.query.location;
      let title = req.query.name;
      const url =
        "https://api.vk.com/method/messages.createChat?user_ids=" +
        encodeURIComponent(creator_id) +
        "&title=" +
        encodeURIComponent(title) +
        "&group_id=199550918&access_token=" +
        this.tokenVK +
        "&v=5.52";
      const response = await axios.get(url);
      const result = response.data;
      let chat_id = result.response + 2000000000;
      const url2 =
        "https://api.vk.com/method/messages.getInviteLink?peer_id=" + 
        encodeURIComponent(chat_id) +
        "&reset=0&group_id=199550918" +
        "&access_token=" +
        this.tokenVK +
        "&v=5.52";
      const response2 = await axios.get(url2);
      const invite = response2.data.response.link;
      if (title && chat_id && creator_id && invite && location){
        var sql =
        "INSERT INTO conversations (chat_id, name, creator_id, invite, location) VALUES (?, ?, ?, ?, ?)";
        var params = [chat_id, title, creator_id, invite, location];
        db.run(sql, params);
      }
      if (invite !== undefined) {
        res.json({
          status: "Error",
        });
      } else {
        res.json({
          status: "OK",
          data: result,
        });
      }
    });
  }

  // Обработчик получения комнат
  getConversations(req, res) {
    let userID = req.query.userID;

    let location = req.query.location;
    try {
      var params = [];
      if (!location && userID) {
        var sql =
          "SELECT name, chat_id, creator_id, invite, location FROM conversations WHERE creator_id = ?";
        var params = [userID];
      } else if (location && !userID) {
        var sql =
          "SELECT name, chat_id, creator_id, invite, location FROM conversations WHERE location = ?";
        var params = [location];
      } else {
        var sql =
          "SELECT name, chat_id, creator_id, invite, location FROM conversations";
      }

      db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({
          data: rows,
        });
      });
    } catch (e) {
      res.json({
        status: { Error: e },
      });
    }
  }
}

// Экспортируем наш класс наружу
module.exports = Application;
