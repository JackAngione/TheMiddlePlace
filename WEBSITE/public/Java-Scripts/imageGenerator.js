//CREATE IMAGES FOR ATTRIBUTES
head    = new Image();
ear    = new Image();
hair    = new Image();
eye     = new Image();
clothing     = new Image();

//const imageArray = [head, ear, hair, eye, clothing];

//GET CANVAS
const canvas = document.getElementById("imageGen").getContext('2d');
canvas.globalCompositeOperation = "source-over";
canvas.imageSmoothingEnabled = false;
canvas.webkitImageSmoothingEnabled = false;
canvas.msImageSmoothingEnabled = false;
canvas.imageSmoothingEnabled = false;

//

//GET SLIDERS
const backgroundSlider = document.getElementById("backgroundSlider");
const headSlider = document.getElementById("headSlider");
const earSlider = document.getElementById("earSlider");
const hairSlider = document.getElementById("hairSlider");
const eyeSlider = document.getElementById("eyeSlider");
const clothingSlider = document.getElementById("clothingSlider");
const backgroundColors = ["#F0F0F0","#6463b7", "#FBFD94" ,"#B88162","#0F1518"]
//

//UPDATE SLIDERS
function updateSlider()
{
  generateImage(backgroundSlider.value, headSlider.value, earSlider.value, hairSlider.value, eyeSlider.value, clothingSlider.value);
}
//
//CREATE NFT ID
let NFTID;

//GENERATE IMAGE
function generateImage(backgroundNum, headNum, earNum, hairNum, eyeNum, clothingNum)
{
  //CLEAR THE CANVAS AND SET WHITE BACKGROUND
  removeImg();
  canvas.fillStyle = backgroundColors[backgroundNum];
  canvas.fillRect(0,0, document.getElementById("imageGen").width, document.getElementById("imageGen").height);
  //
  
  //GENERATE RANDOM INT FOR EACH ATTRIBUTE TYPE
  if(backgroundNum==null)
  {
    backgroundNum = Math.floor(Math.random() * 4);
  }
  if(headNum == null)
  {
    headNum = Math.floor(Math.random() * 2);
  }
  if(earNum == null)
  {
    earNum = Math.floor(Math.random() * 2);
  }
  if(hairNum == null)
  {
    hairNum = Math.floor(Math.random() * 2);
  }
  if(eyeNum == null)
  {
    eyeNum = Math.floor(Math.random() * 2);
  }
  if(clothingNum == null)
  {
    clothingNum = Math.floor(Math.random() * 2);
  }
  //console.log("setting initial skynum")


  //SET SLIDER VALUES TO THE RANDOM INT
  backgroundSlider.value = backgroundNum.toString()
  headSlider.value = headNum.toString()
  earSlider.value = earNum.toString()
  hairSlider.value = hairNum.toString()
  eyeSlider.value = eyeNum.toString()
  clothingSlider.value = clothingNum.toString()
  //
  //LOAD IMAGES
  function loadImages(sources, callback) 
  {
    let src;
    const images = {};
    let loadedImages = 0;
    let numImages = 0;
    // get num of sources
    for(src in sources) {
      numImages++;
    }
    for(src in sources) {
      images[src] = new Image();
      images[src].onload = function()
      {
        if(++loadedImages >= numImages) 
        {
          callback(images);
        }
      };

      images[src].src = sources[src];
    }
  }

  const sources =
      {
        //HEAD
        image0: "/landscapeNFTGnerator/LANDSCAPETESTIMAGES/head/" + headNum + ".png",
        //EAR
        image1: "/landscapeNFTGnerator/LANDSCAPETESTIMAGES/ear/" + earNum + ".png",
        //HAIR
        image2: "/landscapeNFTGnerator/LANDSCAPETESTIMAGES/hair/" + hairNum + ".png",
        //EYE
        image3: "/landscapeNFTGnerator/LANDSCAPETESTIMAGES/eyes/" + eyeNum + ".png",
        //CLOTHING
        image4: "/landscapeNFTGnerator/LANDSCAPETESTIMAGES/clothing/" + clothingNum + ".png"
      };

  //CALL IMAGE LOAD FUNCTION
  loadImages(sources, function(images) {
    canvas.drawImage(images.image0, 0, 0);
    if(earNum !== 0)
    {
      canvas.drawImage(images.image1, 0, 0);
    }
    if(hairNum !==0)
    {
      canvas.drawImage(images.image2, 0, 0);
    }
    if(eyeNum !== 0)
    {
      canvas.drawImage(images.image3, 0, 0);
    }
    canvas.drawImage(images.image4, 0, 0);
  });


  //GET NFT ID
  //NFTID = "H" + hairSlider.value + "E" + eyeSlider.value + "E" + earSlider.value + "M" + mouthSlider.value + "C" + clothesSlider.value;
  NFTID = headSlider.value + "_" + earSlider.value + "_" + hairSlider.value + "_" + eyeSlider.value + "_" + clothingSlider.value;
  console.log(NFTID);
}

//CLEAR CANVAS
function removeImg()
{ 
  canvas.clearRect(0, 0, document.getElementById("imageGen").width, document.getElementById("imageGen").height);
  //SET SLIDER VALUES TO ZERO
  backgroundSlider.value = "0"
  headSlider.value = "0"
  earSlider.value = "0"
  hairSlider.value = "0"
  eyeSlider.value = "0"
  clothingSlider.value = "0"
  //
}

function getNFTIDpost()
{

  //CUT OFF FIFTH VALUE SO THAT IT MATCHES TEST NFT IDs
  //truncatedNFTID = NFTID.substring(0, 7)
  payload = {"theid": NFTID}
  fetch("/NFT_ID",
  { 
    method: "POST", 
    headers:{ "Content-Type": "application/json",},
    body: JSON.stringify(payload),
  })
    .then(response  => response .text())
    .then(data => 
      {
        if(data === "https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/undefined")
        {
          alert("Sorry, the NFTID and URL dont match up (இ﹏இ`｡)")
        }
        else
        {
          window.open(data)
        }
      }
      )
    .catch((error) => 
    {
      console.error('Error:', error);
    })
    
  return truncatedNFTID
}