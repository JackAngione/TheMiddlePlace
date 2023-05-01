const fs = require('fs')
const nReadlines = require('n-readlines');
const textLines = new nReadlines("./accountDB/accounts.txt");

const userArray = [];
const passwordArray = [];
const compareResult = false;

function validateUserInfo(usernameCompare, pwCompare) {
    let currentLineArray = [];

    let count = -1;

    let line;
    let currentUsername;
    let currentPassword;
    while (line = textLines.next()) {
        //SKIP FIRST LINE
        if (count == -1) {
            count++
        } else {
            line = line.toString().split(" ").join("")
            currentLineArray = line.split(";")
            currentUsername = currentLineArray[0]
            currentPassword = currentLineArray[1]

            console.log("passed username: " + usernameCompare)
            console.log("name read from file: " + currentUsername)
            console.log("passed password: " + pwCompare)
            console.log("password read from file: " + currentPassword)

            if (currentUsername === usernameCompare && currentPassword === pwCompare) {
                console.log("correct")
                return true
            } else {
                console.log("no")
            }

            count++
        }
    }

    if (compareResult === false) {

        return "Incorrect login!"
    }

    console.log("array loaded up!")
}
module.exports = { validateUserInfo }