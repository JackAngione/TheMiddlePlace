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
  //GENERATE RANDOM INT FOR EACH ATTRIBUTE TYPE
  if(headNum == null)
  {
    backgroundNum = Math.floor(Math.random() * 5);
    headNum = Math.floor(Math.random() * 2);
    earNum = Math.floor(Math.random() * 3);
    hairNum = Math.floor(Math.random() * 3);
    eyeNum = Math.floor(Math.random() * 2);
    clothingNum = Math.floor(Math.random() * 2);
  }
  //SETUP CLEAR CANVAS WITH BACKGROUD IMAGE
  removeImg();
  canvas.fillStyle = backgroundColors[backgroundNum];
  canvas.fillRect(0,0, document.getElementById("imageGen").width, document.getElementById("imageGen").height);

  //SET SLIDER VALUES TO THE RANDOM INT
  backgroundSlider.value = backgroundNum.toString()
  headSlider.value = headNum.toString()
  earSlider.value = earNum.toString()
  hairSlider.value = hairNum.toString()
  eyeSlider.value = eyeNum.toString()
  clothingSlider.value = clothingNum.toString()
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
        image0: "/nftSourceImages/head/" + headNum + ".webp",
        //EAR
        image1: "/nftSourceImages/ear/" + earNum + ".webp",
        //HAIR
        image2: "/nftSourceImages/hair/" + hairNum + ".webp",
        //EYE
        image3: "/nftSourceImages/eyes/" + eyeNum + ".webp",
        //CLOTHING
        image4: "/nftSourceImages/clothing/" + clothingNum + ".webp"
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
}

function getNFTIDpost()
{
  let payload = {"theid": NFTID}
  fetch("/NFT_ID",
  { 
    method: "POST", 
    headers:{ "Content-Type": "application/json",},
    body: JSON.stringify(payload),
  })
    .then(response  => response .text())
    .then(data => 
      {
        if(data === "https://rarible.com/token/0x72cc367ea820a456ab3c5fb17424b6837c8a514e:undefined")
        {
          alert("Sorry, image combination doesn't have a matching NFT (இ﹏இ`｡)")
        }
        else {
          window.open(data)
        }
      }
      )
    .catch((error) => 
    {
      console.error('Error:', error);
    })
  return NFTID
}