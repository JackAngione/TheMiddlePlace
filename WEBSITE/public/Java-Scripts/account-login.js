window.onload = function () {
    var loginForm = document.getElementById('loginForm')
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        username = document.getElementById('username').value
        password = document.getElementById('password').value
        console.log(username)
        console.log(password)
        sendUserInfo(username, password)
    })
}

function sendUserInfo(user, pass) {

    //CUT OFF FIFTH VALUE SO THAT IT MATCHES TEST NFT IDs
    let payload = {"usernameID": username, "passwordID": password}
    fetch("/accountDB",
        {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(payload),
        })
        .then(response => response.text())
        .then(data => {
            if (data === "redirect") {
                window.open("./", "_self")

            }

        }
        )
        .catch((error) => {
            console.error('Error:', error);
        })
        alert("(இ﹏இ`｡) successfully logged in ｡◕ ‿ ◕｡")
    return "hi"
}