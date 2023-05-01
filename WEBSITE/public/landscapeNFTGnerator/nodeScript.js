const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')

//CREATE CANVAS
const width = 2500
const height = 3000
const canvas = createCanvas(width, height)
const context = canvas.getContext('2d')
//
//CREATE NFT ID
var NFTID;

//GENERATE IMAGE
async function generateNFTs() 
{
    context.clearRect(0, 0,)
    //CLEAR THE CANVAS AND SET WHITE BACKGROUND
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, width, height)
    //

    //SKY LOOP
    for (let i = 0; i < 2; i++) 
    {
        context.fillStyle = "#FFFFFF";
        context.fillRect(0, 0, width, height)
        //BACKGROUND LOOP
        for (let j = 0; j <= 2; j++) 
        {
            //FOREGROUND LOOP
            for (let k = 0; k <= 2; k++) 
            {
                foreNum = k
                backNum = j
                if (i == 0) {
                    skyBackNum = 0
                }
                else {
                    skyBackNum = 1
                }
                skyNum = i
                NFTID = foreNum + "_" + backNum + "_" + skyBackNum + "_" + skyNum
                //PRINT SKYBACKGROUND
                await loadImage("./LANDSCAPETESTIMAGES/SKYBACKGROUND/" + skyBackNum + ".png").then((image) => {
                    context.drawImage(image, 0, 0, width, height)
                    console.log("printed skybackground " + skyBackNum);
                })
                //
                //PRINT SKY
                await loadImage("./LANDSCAPETESTIMAGES/SKY/" + skyNum + ".png").then((image) => {
                    context.drawImage(image, 0, 0, width, height)
                    console.log("printed sky " + skyNum);
                })
                //
                //PRINT BACKGROUND
                await loadImage("./LANDSCAPETESTIMAGES/BACKGROUND/" + backNum + ".png").then((image) => {
                    context.drawImage(image, 0, 0, width, height)
                    console.log("printed background " + backNum);
                })
                //
                //PRINT FOREGROUND
                await loadImage("./LANDSCAPETESTIMAGES/FOREGROUND/" + foreNum + ".png").then((image) => {
                    context.drawImage(image, 0, 0, width, height)
                    
                })
                //WRITE IMAGE FILE
                const buffer = canvas.toBuffer('image/jpeg', { quality: 1.0 })
                fs.writeFileSync("./RENDERED_IMAGES/" + NFTID + ".jpg", buffer)
                console.log("successfully written file");
                //
            }
        }
    }  
}
//RUN IMAGE GENERATOR
generateNFTs()