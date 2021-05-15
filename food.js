class Food{
    constructor(){
        this.foodS=0;
        this.lastFed;
        this.image=loadImage("images/milk.png");
    }

   
    getFoodStock(){
       return this.foodS;
    }

    updateFoodStock(foodS){
        this.foodS=foodS;
    }

    deductFood(){
        if(this.foodS>0){
            this.foodS=this.foodS-1;
        }
    }

    bedroom(){
        background(bedroomImg,550,500);
    }

    garden(){
        background(gardenImg,550,500);
    }

    washroom(){
        background(washroomImg,550,500);
    }

    display()
    {
        var x=80,y=100;
        imageMode(CENTER);
        image(this.image,70,320,70,70);

        if(this.foodS!=0){
            for(var i=0;i<this.foodS;i++){
                if(i%10==0){
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }


    }
  
}
  
  
  