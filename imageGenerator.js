//CREATE IMAGES FOR ATTRIBUTES
SkyColor    = new Image();
Sky    = new Image();
Background    = new Image();
Foreground     = new Image();

var imageArray = [SkyColor, Sky, Background, Foreground];

//GET CANVAS
var canvas = document.getElementById("imageGen").getContext('2d');
canvas.globalCompositeOperation = "source-over";
canvas.imageSmoothingEnabled = false;
canvas.webkitImageSmoothingEnabled = false;
canvas.msImageSmoothingEnabled = false;
canvas.imageSmoothingEnabled = false;

//

//GET SLIDERS
var skySlider = document.getElementById("skySlider");
var backgroundSlider = document.getElementById("backgroundSlider");
var foregroundSlider = document.getElementById("foregroundSlider");
//

//UPDATE SLIDERS
function updateSlider()
{
  generateImage(skySlider.value, backgroundSlider.value, foregroundSlider.value);
}
//
//CREATE NFT ID
var NFTID;
//GENERATE IMAGE
function generateImage(skyNum, backgroundNum, foregroundNum) 
{
  //CLEAR THE CANVAS AND SET WHITE BACKGROUND
  removeImg();
  canvas.fillStyle = "#FFFFFF";
  canvas.fillRect(0,0, document.getElementById("imageGen").width, document.getElementById("imageGen").height);
  //
  
  //GENERATE RANDOM INT FOR EACH ATTRIBUTE TYPE
  if(skyNum==null)
  {
    skyNum = Math.floor(Math.random() * 2);
  }
  if(backgroundNum == null)
  {
    backgroundNum = Math.floor(Math.random() * 2);
  }
  if(foregroundNum == null)
  {
    foregroundNum = Math.floor(Math.random() * 2);
  }
  console.log("setting initial skynum")
  var skyColorNum = 0;
  if(skyNum == 0)
  {
    console.log("Day")
    skyColorNum = 0;
  }
  else
  {
    console.log("Night")
    skyColorNum = 1;
  } 

  //SET SLIDER VALUES TO THE RANDOM INT
  skySlider.value = (skyNum).toString();
  backgroundSlider.value = (backgroundNum).toString();
  foregroundSlider.value = (foregroundNum).toString();
  //
  //LOAD IMAGES
  function loadImages(sources, callback) 
  {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for(var src in sources) {
      numImages++;
    }
    for(var src in sources) {
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

  var sources = 
  {
    image0: "/landscapeNFTGnerator/LANDSCAPETESTIMAGES/SKYBACKGROUND/"+ skyColorNum + ".png",
    image1: "/landscapeNFTGnerator/LANDSCAPETESTIMAGES/SKY/" + skyNum  + ".png",
    image2: "/landscapeNFTGnerator/LANDSCAPETESTIMAGES/BACKGROUND/"+ backgroundNum + ".png",
    image3: "/landscapeNFTGnerator/LANDSCAPETESTIMAGES/FOREGROUND/"+ foregroundNum + ".png"
  };

  loadImages(sources, function(images) {
    canvas.drawImage(images.image0, 0, 0);
    canvas.drawImage(images.image1, 0, 0);
    canvas.drawImage(images.image2, 0, 0);
    canvas.drawImage(images.image3, 0, 0);
  });
  //CALL IMAGE LOAD FUNCTION
  loadImages()

  /*
  //PRINT Sky Color
  SkyColor.addEventListener('load', function() 
  {
  canvas.drawImage(SkyColor, 0,0);
  }, false);
  SkyColor.src = "/landscapeNFTGnerator/LANDSCAPETESTIMAGES/SKYBACKGROUND/"+ skyColorNum + ".png";
  //PRINT Sky
  Sky.addEventListener('load', function() 
  {
    canvas.drawImage(Sky, 0,0);
  }, false);
  Sky.src = "/landscapeNFTGnerator/LANDSCAPETESTIMAGES/SKY/" + skyNum  + ".png";
  
  //PRINT Background
  Background.addEventListener('load', function() 
  {
    canvas.drawImage(Background, 0,0);
  }, false);
  Background.src = "/landscapeNFTGnerator/LANDSCAPETESTIMAGES/BACKGROUND/"+ backgroundNum + ".png";
  //
  //PRINT Foreground
  Foreground.addEventListener('load', function() 
  {
    canvas.drawImage(Foreground, 0,0);
  }, false);
  Foreground.src = "/landscapeNFTGnerator/LANDSCAPETESTIMAGES/FOREGROUND/"+ foregroundNum + ".png";
  */
 
  //
  //GET NFT ID
  //NFTID = "H" + hairSlider.value + "E" + eyeSlider.value + "E" + earSlider.value + "M" + mouthSlider.value + "C" + clothesSlider.value;
  NFTID = foregroundSlider.value + "_" + backgroundSlider.value + "_" + skyNum + "_" + skySlider.value;
  //console.log(NFTID);
}
//
//CLEAR CANVAS
function removeImg()
{ 
  canvas.clearRect(0, 0, document.getElementById("imageGen").width, document.getElementById("imageGen").height);
}
//

function getNFTIDpost()
{

  //CUT OFF FIFTH VALUE SO THAT IT MATCHES TEST NFT IDs
  truncatedNFTID = NFTID.substring(0, 7)
  payload = {"theid": truncatedNFTID}
  fetch("/", 
  { 
    method: "POST", 
    headers:{ "Content-Type": "application/json",},
    body: JSON.stringify(payload),
  })
    .then(response  => response .text())
    .then(data => 
      {
        if(data == "https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/undefined")
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