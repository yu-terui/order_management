// express使わない…？
// いつも通り、add_form文のルーティングも設定して画面表示が可能になったうえで、
// SPAに仕様変更する上で不要な部分を削っていく？
// CommonJSで関連パッケージの読み込み
const express = require("express");
const morgan = require("morgan");
const ejs = require("ejs");
const app = express(); //インスタンス化してappに代入
app.set('views', './');// デフォルトをviewsディレクトリからルート直下に変更

// アクセス先のポート番号を定義
const port = 3000;

// JSオブジェクト形式に変換
app.use(express.urlencoded({ extend: true }));

//req.bodyの中に送信したデータが保存される
app.set("view engine", "ejs"); //テンプレートエンジンをEJSに

const mysql2 = require("mysql2");
const con = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "order_management",
  dateStrings: "date",
  multipleStatements: true,
});

// ファイルの取得
app.use("/assets", express.static("assets"));
app.use("/js", express.static("js"));
app.use("/views", express.static("views"));

// favicon.icoがリクエストされた場合、空のレスポンスを返す。
app.get("/favicon.ico", (req, res) => {
  res.status(204);
});

// mysqlからデータを持ってくる
app.get("/", (req, res) => {
  const sql = "select * from orders";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.render("index", {
      orders: result,
    });
  });
});
app.post("/add", (req, res) => {
  const sql = "insert into orders (person, phone, address, date, product, amount, price) values ();";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.redirect("index", {
      orders: result,
    });
  });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
