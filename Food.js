class Food {
    constructor(){
        this.foodStock = 0;
        this.lastFedTime;
        this.Dog = ("Images/Dog.png");
    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }

    getFedTime(lastFed){
     this.lastFedTime = lastFed;
    }

    feedFoodStock(){
      if(this.foodStock > 0){
          this.foodStock -= 1;
      }
    }

    getFoodStock(){
        return this.foodStock;
    }

    display(){
        x = 80;
        y = 100;
        imageMode(CENTER);
        image(this.Dog,720, 220, 70, 70);
        if(this.foodStock != 0){
            for(i=0; i<this.foodStock; i++){
                if(i%10 == 0){
                    x = 80;
                    y += 50;
                }

                image(this.Dog,x,y,50,50);
                x += 30;
            }
        }
    }
}