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
    this.tokenVK = "ВАШ ТОКЕН ТУТ"; // <----------
  }

  attachRoutes() {
    let app = this.expressApp;
    let jsonParser = bodyParser.json();

    var chat_id = null;
    var invite = null;
    //Это уже моё
    app.get("/getConversations", this.getConversations.bind(this));
    app.get("/createConversation", async (req, res) => {
      const api = async (method, params, token = servToken) => {
        const res = await axios({
          method: "POST",
          url: `https://api.vk.com/method/${method}?access_token=${token}&v=5.122`,
          params,
        });
        if (!res.data.response && res.data.response !== 0) {
          return res.data;
        }
        return res.data.response;
      };

      let creator_id = req.query.creator_id;
      let location = req.query.location;
      let title = req.query.name;
      var url =
        "https://api.vk.com/method/messages.createChat?user_ids=" +
        creator_id +
        "&title=" +
        title +
        "&group_id=199550918&access_token=" +
        this.tokenVK +
        "&v=5.52";
      const response = await axios.get(url);
      const result = response.data;
      let chat_id = result.response + 2000000000;
      console.log(chat_id);
      const url2 =
        "https://api.vk.com/method/messages.getInviteLink?peer_id=" +
        chat_id +
        "&reset=0&group_id=199550918" +
        "&access_token=" +
        this.tokenVK +
        "&v=5.52";
      const response2 = await axios.get(url2);
      const result2 = response2.data;
      console.log(result2);
      if (result2.error !== undefined) {
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
        var params = [location];
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
