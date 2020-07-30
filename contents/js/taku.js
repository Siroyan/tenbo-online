"use strict"

let takuId = "";

if (sessionStorage.getItem('takuId') !== null) {
    takuId = sessionStorage.getItem('takuId');
} else {
    takuId = getParam("takuId");
    sessionStorage.setItem('takuId', takuId);
}

console.log(takuId);

const apiUrl = "https://imjvr2oxe1.execute-api.ap-northeast-1.amazonaws.com/dev/taku/" + takuId;

window.onload = () => {
    // セッションから卓IDを取得し画面上部に表示
    document.getElementById("takuId").textContent = takuId;
    // 最新の卓情報に更新
    getTakuInfo();

    $(function(){
        var qrtext = `http://tenbo-online-tenboonlineiod5e36fd8-2zqc4ayjhioi.s3-website-ap-northeast-1.amazonaws.com/taku.html?takuId=${takuId}`;
        var utf8qrtext = unescape(encodeURIComponent(qrtext));
        $("#qrcodeImage").html("");
        $("#qrcodeImage").qrcode({text:utf8qrtext}); 
    });
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

function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}