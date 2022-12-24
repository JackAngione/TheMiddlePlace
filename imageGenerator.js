//---ATTENTION---
//artwork source is not available in the github code

const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')

//CREATE CANVAS
const width = 4096
const height = 4096
const canvas = createCanvas(width, height)
const context = canvas.getContext('2d')
//
//CREATE NFT ID
var NFTID;
var imgCount = 1
const backgroundColors = ["#F0F0F0","#6463b7", "#FBFD94" ,"#B88162","#0F1518"]
//GENERATE IMAGE
async function generateNFTs() 
{
    //HEAD LOOP
    for (let headNum = 0; headNum < 2; headNum++) 
    {
        //EAR LOOP
        for (let earNum = 0; earNum <= 2; earNum++) 
        {
            //HAIR LOOP
            //Hair num goes from 0 to 2, 2 being bald, only available to male face
            for(let hairNum = 0; hairNum <= 2; hairNum++)
            {
                if(hairNum == 2 && headNum == 0)
                    break;
                //EYES LOOP
                for(let eyeNum = 0; eyeNum <= 1; eyeNum++)
                {
                    //CLOTHING LOOP
                    for(let clothingNum = 0; clothingNum <= 1; clothingNum++)
                    {
                        let randomBackInt =  Math.floor(Math.random() * 4)
                        context.clearRect(0, 0,)
                        
                        //CLEAR THE CANVAS AND SET BACKGROUND COLOR
                        context.fillStyle = backgroundColors[randomBackInt];
                        console.log("Background color = " + backgroundColors[randomBackInt])
                        context.fillRect(0, 0, width, height)
                        NFTID =  headNum + "_" + earNum + "_" + hairNum + "_" + eyeNum + "_" + clothingNum
                        //PRINT HEAD
                        await loadImage("./NFT Source/head/" + headNum + ".png").then((image) => {
                            context.drawImage(image, 0, 0, width, height)
                            console.log("printed head " + headNum);
                        })
                        //
                        //PRINT EAR
                        if(earNum!=0)
                        {
                            await loadImage("./NFT Source/ear/" + earNum + ".png").then((image) => {
                                context.drawImage(image, 0, 0, width, height)
                                console.log("printed ear " + earNum);
                            })
                        }
                        
                        //
                        //PRINT HAIR
                        if(hairNum!=2)
                        {
                            await loadImage("./NFT Source/hair/" + hairNum + ".png").then((image) => {
                                context.drawImage(image, 0, 0, width, height)
                                console.log("printed hair " + hairNum);
                            })
                        }
                        //
                        //PRINT EYE
                        if(eyeNum!=0)
                        {
                            await loadImage("./NFT Source/eyes/" + eyeNum + ".png").then((image) => {
                                context.drawImage(image, 0, 0, width, height)
                                console.log("printed eye " + eyeNum);
                            })
                        }
                        
                        //
                        //PRINT CLOTHING
                        await loadImage("./NFT Source/clothing/" + clothingNum + ".png").then((image) => {
                            context.drawImage(image, 0, 0, width, height)
                            console.log("printed clothing " + clothingNum);
                        })
                        //WRITE IMAGE FILE
                        const buffer = canvas.toBuffer('image/jpeg', { quality: 1.0 })
                        fs.writeFileSync("./RENDERED_IMAGES/No. " + imgCount + ".jpg", buffer)
                        console.log("successfully written file" + "No. " + imgCount);
                        imgCount++
                        //                    
                    }
                    
                }
            } 
        }
    } 
}
//RUN IMAGE GENERATOR
generateNFTs()