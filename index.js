// 初期設定関連
var express = require("express");
var app = express();
require("date-utils");
require("dotenv").config();
app.set("view engine", "ejs");
app.use("/static", express.static("public"));

// 初期表示 『 / 』にアクセスしたときの処理
app.get("/", function (req, res, next) {
  (async () => {
    // 現在時間の取得
    var dt = new Date();
    var nowTime = dt.toFormat("HH24:MI");
    // 画面を表示する
    res.render("index", {
      title: process.env.APPLICATION_TITLE,
      nowTime: nowTime,
      userName: process.env.USER_NAME,
      botName: process.env.BOT_NAME,
      sorry_message: process.env.SORRY_MESSAGE,
      bot1stMessage: process.env.BOT_1ST_MESSAGE,
    });
  })().catch(next);
});

// メッセージを受け取ったときにオウム返しする
app.get("/sendMsg", function (req, res, next) {
  (async () => {
    // 入力されたメッセージ
    var originalKeyword = req.query.keyword;
    // ここでオウム返しを実装
    res.send(originalKeyword + "って本当ですか？");
  })().catch(next);
});

// サーバ起動
app.listen(process.env.PORT, "0.0.0.0", function () {
  console.log("server starting on " + process.env.PORT);
});
