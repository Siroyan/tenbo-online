"use strict"

const takuId = sessionStorage.getItem('takuId');
const apiUrl = "https://imjvr2oxe1.execute-api.ap-northeast-1.amazonaws.com/dev/taku/" + takuId;

window.onload = () => {
    // セッションから卓IDを取得し画面上部に表示
    document.getElementById("takuId").textContent = takuId;
    // 最新の卓情報に更新
    getTakuInfo();
};

function getTakuInfo() {
    // GET method
    fetch(apiUrl)
        .then((res) => {
            return res.json();
        })
        .then((takuInfoJson) => {
            console.log(takuInfoJson);
            // 点棒情報をJSONから取得し表示
            document.getElementById("eTenbo").textContent = takuInfoJson["e_point"];
            document.getElementById("sTenbo").textContent = takuInfoJson["s_point"];
            document.getElementById("wTenbo").textContent = takuInfoJson["w_point"];
            document.getElementById("nTenbo").textContent = takuInfoJson["n_point"];
        })
        .catch((error) => {
        // エラー処理 後で書く
        });
}

function switchPoint() {
    // Formから情報を取得
    let transfer   = document.getElementById("tenboSwitchingForm").transfer.value;
    let receiver   = document.getElementById("tenboSwitchingForm").receiver.value;
    let tenboValue = document.getElementById("tenboSwitchingForm").tenboValue.value;
    console.log(tenboValue);
    console.log(transfer);
    // POST method
    fetch(apiUrl + `?transfer=${transfer}&receiver=${receiver}&value=${tenboValue}`, {
            method: "POST"
        })
        .then((res) => {
            return res.json();
        })
        .then((takuInfoJson) => {
            // 点棒情報をJSONから取得し表示
            document.getElementById("eTenbo").textContent = takuInfoJson["e_point"];
            document.getElementById("sTenbo").textContent = takuInfoJson["s_point"];
            document.getElementById("wTenbo").textContent = takuInfoJson["w_point"];
            document.getElementById("nTenbo").textContent = takuInfoJson["n_point"];
        })
        .catch((error) => {
        // エラー処理 後で書く
        });
}