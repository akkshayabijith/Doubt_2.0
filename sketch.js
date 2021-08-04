var dog,sadDog,happyDog;
var database,food,foodObj,addFood,feed,feedT,lastFed;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database = firebase.database();

  createCanvas(1000,400);

  food = new Food;

  foodObj = database.ref('Food');
  foodObj.on('value',readFoodStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("Feed Sario🐶");
  feed.position(700, 95);
  feed.mousePressed(feedSario);

  addFood = createButton("Add food🍼");
  addFood.position(800, 95);
  addFood.mousePressed(addStock);


}

function draw() {
  background(46,139,87);

  foodObj.display();
  
  feedT = database.ref('lastFedT');
  feedT.on('value',function(data){
    lastFed = data.val();
  })

    fill(255,255,254);
    textSize(15);
    if(lastFed >= 12){
      text("Last fed : " + lastFed%12 + " PM",350, 30);
    }else if(lastFed == 0){
      text("Last fed : 12 AM",350,30);
    }else{
      text("Last fed : " + lastFed + " AM",350,30);
    }
 

  drawSprites();
}

//function to read food Stock

function readFoodStock(data){
  food = data.val();
  foodObj.updateFoodStock(food);
}


//function to update food stock and last fed time
function feedSario(){
    dog.addImage(happyDog);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food: foodObj.getFoodStock(),
      lastFedT: hour()
    })
}

//function to add food in stock

function addStock(){
  food++;
  database.ref('/').update({
    Food: food
  })
}
