// Подключим внешние зависимости из node_modules.
// Каждая библиотека возвращает некоторый объект через module.exports, точно так
// же, как мы это сделали в models.js. Функция require динамически находит
// модуль, исполняет его код и возвращает его module.exports нам.
const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3");
const models = require("./models");
const http = require("http");
const { VK } = require("vk-io");
const axios = require("axios");

const tokenVK =
  "1afc994856824789945759895f9fe43d3c54ac954482b2b3f8652c1ca20ec6319fee2f84b503113839940";

const vk = new VK({
  token: tokenVK,
});

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
    this.manager = new models.ChatRoomManager();
    this.attachRoutes();
    this.chat_id = null;
    this.invite = null;
  }

  attachRoutes() {
    let app = this.expressApp;
    let jsonParser = bodyParser.json();

    //Это уже моё
    app.get("/getConversations", this.getConversations.bind(this));
    app.get("/createConversation", this.createConversation.bind(this));
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

  getChat_id(creator_id, name) {
    var config = {
      method: "get",
      url:
        "https://api.vk.com/method/messages.createChat?user_ids=" +
        creator_id +
        "&title=" +
        name +
        "&group_id=199550918&token=" +
        tokenVK +
        "&v=5.52",
      headers: {
        Origin: "http://localhost:10888",
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios(config)
      .then(function (response) {
        if (response.data.response.link !== undefined) {
          this.chat_id = data.response.link;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getInviteLink(chat_id) {
    var config = {
      method: "get",
      url:
        "https://api.vk.com/method/messages.getInviteLink?chat_id=" +
        (chat_id + 2000000000) +
        "&rest=0&group_id=199550918&token=" +
        tokenVK +
        "&v=5.52",
      headers: {
        Origin: "http://localhost:10888",
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios(config)
      .then(function (response) {
        if (response.data.response.link !== undefined) {
          this.invite = data.response.link;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  createConversation(req, res) {
    let creator_id = req.query.creator_id;
    let name = req.query.name;
    let location = req.query.location;
    try {
      this.getChat_id(creator_id, name);
      this.getChat_id(creator_id, name);
      this.getInviteLink(chat_id);
      console.log(d,g);
    } catch (e) {
      res.json({
        status: { Error: e },
      });
    }
    try {
      var a = this.val(creator_id);
      console.log(a);
    } catch (e) {
      res.json({
        status: { Error: e },
      });
    }
    console.log(name, chat_id, creator_id, invite, location);
    try {
      var params = [];
      if (creator_id && name && location && invite) {
        var sql =
          "INSERT INTO conversations (name, creator_id, invite, location) VALUES (?, ?, ?, ?)";
        var params = [name, creator_id, invite, location];
        console.log(sql, params);
        db.run(sql, params);
        res.json({
          status: "OK",
        });
      } else {
        res.json({
          status: { Error: "One of params is missing" },
        });
      }
    } catch (e) {
      res.json({
        status: { Error: e },
      });
    }
  }
}
// Экспортируем наш класс наружу
module.exports = Application;
