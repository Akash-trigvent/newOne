let btn = document.getElementById("btn")
let logoutbtn = document.getElementById("logoutBtn")
//var getLoginStoredVal = '';
window.onload = function () {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        console.log(tabs)
        var activeTab = tabs[0];
        if (activeTab.url.indexOf("facebook.com") != -1) {
            chrome.tabs.sendMessage(activeTab.id, {"action":"check"});
        } else {
            window.open("https://www.facebook.com");
        }
    });
    chrome.storage.sync.get(["login"], function (result) {
        console.log(result.login);
        var getLoginStoredVal = result.login;
        console.log(getLoginStoredVal)
        if (getLoginStoredVal == "yes") {
            var element = document.getElementById("login_page");
            element.classList.add("hide");
            var elementLogout = document.getElementById("logout_page");
            elementLogout.style.display = "block";
        }
    })
        btn.addEventListener("click", function () {
            let id_value = document.getElementById("userId").value
            let pswd_value = document.getElementById("userPswd").value
            if (id_value != "" && pswd_value != "") {
                chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                    console.log(tabs)
                    var activeTab = tabs[0];
                    if (activeTab.url.indexOf("facebook.com") != -1) {
                        chrome.tabs.sendMessage(activeTab.id, { "action": "login_user", "userId": id_value, "userPswd": pswd_value });
                    }
                });
            }else{
                alert("please enter the fields")
            }            
        })
        logoutbtn.addEventListener("click", function () {
            chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                console.log(tabs)
                chrome.storage.sync.set({ "login": "no" });
                var activeTab = tabs[0];
                if (activeTab.url.indexOf("facebook.com") != -1) {
                    chrome.tabs.sendMessage(activeTab.id, { "action": "change" });
                } 
            });
        })
}