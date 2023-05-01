const fs = require('fs')
const rl = require('readline');
const nftFunctions = require("./public/Java-Scripts/nftURL.js")
const express = require("express")
const accountProcess = require("./public/Java-Scripts/processAccount.js");
const { request } = require('http');
const { response } = require('express');
const app = express()
const session = require('express-session')

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/*USE EJS MAIN PAGE */
app.get("/", (req, res) => {
  //console.log("here")
  res.render("index.ejs")
})

app.post("/NFT_ID", (req, res) => {
  console.log(nftFunctions.getURL(req.body.theid, nftFunctions.parseIDs()))
  //res.send("sending information....")
  res.send(nftFunctions.getURL(req.body.theid, nftFunctions.parseIDs()))
  console.log("all done!")
});

// ---
app.post("/accountDB", (req, res) => {
  console.log("here")
  username = req.body.usernameID
  password = req.body.passwordID

  if (accountProcess.validateUserInfo(username, password)) {
    req.session.loggedin = true
    req.session.username = username

    res.send("redirect")
    //res.redirect("./home")
  } else {
    res.send("Incorrect username and/or password!")
  }

  console.log("all done22!")

});
app.get("/home", function (req, res) {
  if (req.session.loggedin) {
    res.send("welcome back " + req.session.username)
  } else {
    res.send("not logged in")
    
  } 
  res.end()
})

app.listen(3000)
console.log("server started")