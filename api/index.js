const Application = require("./app");
// JSON-файлы тоже можно подгружать через require!
const config = require("./config.json");

let app = new Application();

app.expressApp.listen(config.port, config.host, function () {
  console.log(`App listening at port ${config.port}`);
});


