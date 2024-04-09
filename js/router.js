"use strict";
const route = (event) => {
  // クリック時のイベントを取得
  event = event || window.event;
  // ブラウザのデフォルト動作をキャンセル
  event.preventDefault();
  // ブラウザの履歴に追加！
  window.history.pushState({}, "", event.target.href);
  handleLocation();
};
const routes = {
  404: "../views/404.ejs",
  "/": "../views/index.ejs",
  "/add_form/": "../views/add_form.ejs",
};
const handleLocation = async () => {
  // 現在のパスを取得
  const path = window.location.pathname;
  // 現在のパスに紐づくejsのパスを取得
  const route = routes[path] || routes[404];
  // ejsを取得
  const ejs = await fetch(route).then((data) => data.text());
  // 取得したejsを動的にルート直下のindex.ejsに差し込む
  document.getElementById("main-page").innerHTML = ejs;
};
// ブラウザの戻る・進むボタン押下時に発火
// ブラウザのhistoryを元に紐づくhtmlを取得して差し込む
window.addEventListener("popstate", (event) => {
  handleLocation();
});
handleLocation();
