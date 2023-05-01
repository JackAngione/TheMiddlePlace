const fs        = require('fs')
const nReadlines = require('n-readlines');
const textLines = new nReadlines("./public/Java-Scripts/NFT_Tokens.txt");

const NFTIDarray = [];
const tokens = [];

function parseIDs()
{
    let currentLineArray = [];
    let count = -1;
    let line;
    while (line = textLines.next()) {
        //SKIP FIRST LINE
        if (count === -1) {
            count++
        } else {
            line = line.toString().split(" ").join("")
            currentLineArray = line.split(",")

            NFTIDarray[count] = currentLineArray[0]
            tokens[count] = currentLineArray[1]
            console.log(NFTIDarray)
            count++
        }
    }
    console.log("array loaded up!")
}

//NFTVIEW BUTTON CALLS THIS TO GET THE URL BASED ON CURRENT SLIDERS
function getURL(nftString)
{
    parseIDs()
    console.log("generating NFTID URL...")
    //let currentID = (hairSlider.value + "_"+ eyeSlider.value + "_" + earSlider.value +"_" + mouthSlider.value)
    let indexNum = NFTIDarray.indexOf(nftString)
    console.log(tokens[indexNum])
    //document.getElementById(viewLink).action = ("https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/" + tokens[indexNum])
    return ("https://rarible.com/token/0x72cc367ea820a456ab3c5fb17424b6837c8a514e:" + tokens[indexNum])
}
//getURL()
module.exports = {getURL, parseIDs};