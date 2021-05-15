//Create variables here
var dog,dogImage,dogHappy, database, foodS, foodStock,feed,addFood;
//var foodStock , lastFed;
var feedDog,addFood;
var fedTime, lastFed;
var foodObj;
var changingGameState , readingGameState;
// images for dog's background
var bedroomImg,gardenImg,washroomImg;
var gameState="";
var dogSad,dogLazy;
var milkBottle2;


function preload()
{
	//dog Images
  dogImage=loadImage("images/dogImg.png");
  dogHappy=loadImage("images/dogImg1.png");
  dogSad=loadImage("images/Vaccination.jpg")
  dogLazy=loadImage("images/Lazy.png");
  //rooms images
  bedroomImg=loadImage("images/Bed Room.png");
  gardenImg=loadImage("images/Garden.png");
  washroomImg=loadImage("images/Wash Room.png");
  livingroom=loadImage("images/Living Room.png")
  
  milkBottle2=loadImage("images/milk.png");
}

function setup() {
  database = firebase.database();
	createCanvas(1100, 800);

  dog=createSprite(550,380,10,10);
  dog.addImage(dogImage);
  dog.scale=0.2;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);


  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
  

  foodObj= new Food();


}

function draw() {  
  background(46, 139, 87);

  foodObj.display();
  //writeStock(foodS);

  if(foodS==0){
    dog.addImage(dogHappy);
    milkBottle2.visible=false;
  }else{
    dog.addImage(dogSad);
    milkBottle2.visible=true;
  }

  if(gameState===1){
    dog.addImage(dogHappy);
    dog.scale=0.175;
    dog.y=250;
  }
  if(gameState===2){
    dog.addImage(dogSad);
    dog.scale=0.175;
    milkBottle2.visible=false;
    dog.y=250;
  }

  var Bath=createButton("I want to take bath!");
  Bath.position(580,155);
  if(Bath.mousePressed(function(){
    gameState=3;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===3){
    dog.addImage(washroomImg);
    dog.scale=1
    milkBottle2.visible=false;
  }

  var Sleep=createButton("I am very sleepy!");
  Sleep.position(580,185);
  if(Sleep.mousePressed(function(){
    gameState=4;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===4){
    dog.addImage(bedroomImg);
    dog.scale=1
    milkBottle2.visible=false;
  }

  var Play=createButton("Lets Play!");
  Play.position(580,215);
  if(Play.mousePressed(function(){
    gameState=5;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===5){
    dog.addImage(livingroom);
    dog.scale=1
    milkBottle2.visible=false;
  }

  var playGarden=createButton("Lets play in park!");
  playGarden.position(580,125);
  if(playGarden.mousePressed(function(){
    gameState=6;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===6){
    dog.addImage(gardenImg);
    dog.scale=1
    milkBottle2.visible=false;
  }



  /*currentTime=hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry");
    foodObj.display();
  }

  
  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.addImage(dogLazy);
  }else{
    feed.show();
    addFood.show();
    dog.addImage(dogSad);
  }*/





  /*fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed:"+lastFed%12 + "PM",450,20);
  }
  else if(lastFed==0){
    text("Last Feed: 12 AM",450,20);
  }
  else{
    text("Last Feed:"+lastFed+"AM",450,20);
  }

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })*/


  
  var button=createButton("Add Food!");
  button.position(370,125);

  if(button.mousePressed(function(){
      foodS=foodS-1;
      gameState=1;
      database.ref('/').update({'gameState':gameState})
  }));

  var addFood=createButton("Feed The Dog!");
  addFood.position(470,125);

  if(addFood.mousePressed(function(){
      foodS=foodS+1;
      gameState=1;
      database.ref('/').update({'gameState':gameState})
  }));

  fill(255,255,254);
  textSize(15);
  text("Stock:"+foodS,150,20);


  drawSprites();
}



function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })
} 

function feedDog(){
  dog.addImage(dogHappy);
  

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
 
}

 if(foodObj<0){
    dog.addImage(dogImage);

  }


function update(state){
  database.ref('/').update({
    gameState:state
  });
}

