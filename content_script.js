chrome.runtime.onMessage.addListener(function recMsg(message, sender, sendResponse) {
    console.log(message);
    console.log(sender);

    let loginBtn = document.getElementsByName("login")
    let errorBox = document.getElementById("error_box")

    if (message.action === "login_user") {

        document.getElementById("email").value = message.userId
        document.getElementById("pass").value = message.userPswd
        chrome.storage.sync.set({ "login": "yes" });
        if (errorBox == null) {
            loginBtn[0].click()
        }
    }
    if (message.action === "change") {
        if (errorBox == null) {
            let aria = document.querySelector('[aria-label="Your profile"]')
            aria.click()
            let myInterval = setInterval(()=>{
                console.log("1")
                let tagElement = document.getElementsByTagName("span")
                for (let i = 0; i <= tagElement.length; i++) {

                    console.log(tagElement[i].textContent.includes('Log Out'));
                    if (tagElement[i].textContent.includes('Log Out')) {
                        clearInterval(myInterval)
                        //console.log(tagElement[i])
                        tagElement[i].click();
                        // chrome.storage.sync.remove("login")
                    }
                   
                }
            },1000)            
        }
    }
    if(message.action === "check"){
        console.log("opend")
    }

});

