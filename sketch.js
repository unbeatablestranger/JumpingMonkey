var monkey , monkey_running,ground,cover,falseground;
var banana ,bananaImage,bananaGroup;
var obstacle, obstacleImage,obstacleGroup;
var score=0;
var Nobanana=0;
function preload()
{
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}



function setup() 
{
  createCanvas(600, 400);

  ground=createSprite(5,390,800,40);
  ground.shapeColor="darkgreen";
  ground.velocityX=-4;
  
  monkey=createSprite(100,350,100,100);
  monkey.addAnimation("k",monkey_running);
  monkey.scale=0.15;
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height)
  monkey.debug=false;
  
  falseground = createSprite(5,390,800,20);
  falseground.visible=false;
  
  
  bananaGroup=new Group();
  obstacleGroup=new Group();
}


function draw() 
{
  background("lightgreen")
  
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(falseground);
  
  if(keyDown("space")&&monkey.y>=330)
  {
    monkey.velocityY=-16;
  }
  
  score=Math.round(frameCount);
  
  if(monkey.isTouching(bananaGroup))
  {
    Nobanana=Nobanana+1;
    bananaGroup.destroyEach();
  }
  
  if(monkey.isTouching(obstacleGroup))
  {
    Nobanana=Nobanana-3;
    score=score-100;
    obstacleGroup.destroyEach();
  }
  
  if(Nobanana<=-5)
  {
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    monkey.visible=false;
    fill("black");
    text("You lose!",200,200,textSize(50));

  }
  ground.x=ground.width/2;
  
  Spawnobstacles();
  Spawnbanana();
  drawSprites();
  fill("black");
  text("Survival time="+score,10,30,textSize(30));
  text("Bananas="+Nobanana,380,30,textSize(30));
}

function Spawnbanana()
{
  if(frameCount%100===0)
  {
    banana=createSprite(650,200,30,40);
    banana.addImage("h",bananaImage);
    banana.scale=0.11;
    banana.velocityX=-(8+(Nobanana/4));
    banana.lifetime=150;
    bananaGroup.add(banana);
    banana.y=random(120,200); 
  }  
  
}

function Spawnobstacles()
{
  if(frameCount%150===0)
  {
    obstacles=createSprite(650,360,50,70);
    obstacles.addImage("k",obstacleImage);
    obstacles.scale=0.2;
    obstacles.lifetime=150;
    obstacles.velocityX=-(8+(Nobanana/10));
    obstacleGroup.add(obstacles);
    
  
  
  }
}


