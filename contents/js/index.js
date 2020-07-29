"use strict"

function generateTaku() {
    const apiUrl = 'https://imjvr2oxe1.execute-api.ap-northeast-1.amazonaws.com/dev/taku';
    fetch(apiUrl)
        .then((res) => {
            return res.json();
        })
        .then((takuInfoJson) => {
            console.log(takuInfoJson);
            // 卓IDをセッションに保存
            sessionStorage.setItem('takuId', takuInfoJson["taku_id"]);
            // 卓情報画面に移動
            location.href = "taku.html";
        })
        .catch((error) => {
        // エラー処理 後で書く
        });
}
