const nftFunctions = require("./public/Java-Scripts/nftURL.js")
const express = require("express")
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
  res.send(nftFunctions.getURL(req.body.theid, nftFunctions.parseIDs()))
});

app.listen(3000)
console.log("server started")