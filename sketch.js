var balloon;
var backgroundImg;
var database;
var databaseRef;
var height;
var balloonImg;

function preload(){

  backgroundImg = loadImage("Hot Air Ballon-01.png");

  balloonImg = loadAnimation("Hot Air Ballon-02.png", 
  "Hot Air Ballon-03.png", "Hot Air Ballon-04.png");

}
function setup() {
  createCanvas(1500,700);

  database = firebase.database();

  balloon = createSprite(400, 200, 50, 50);
  balloon.addAnimation("hotAirBalloon", balloonImg);

  databaseRef = database.ref('balloon/height');
  databaseRef.on("value", readHeight, showError);
  
}

function draw() {
  background(backgroundImg);  

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.addAnimation("hotAirBalloon", balloonImg);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon.addAnimation("hotAirBalloon", balloonImg);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon", balloonImg);
    balloon.scale = balloon.scale - 0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,10);
    balloon.addAnimation("hotAirBalloon", balloonImg);
    balloon.scale = balloon.scale + 0.005;
  }
  drawSprites();
}

function updateHeight(x,y){
  database.ref('balloon/height').set({

    x: height.x + x,
    y: height.y + y
    
  })
}

function readHeight(data){

  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;

}

function showError(){
  console.log("Error accessing the database");
}