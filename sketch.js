var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy, boyImage;
var ground, invisibleGround, groundImage;


var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var backgroundImg
var score=0;
var jumpSound, collidedSound;

var gameOver, restart;


function preload(){
  jumpSound = loadSound("jump.mp3")
  collidedSound = loadSound("collided.wav")
  
  backgroundImg = loadImage("backgroundImg.png")
  sunAnimation = loadImage("sun.png");
  
  boyImage = loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png","boy5.png","boy6.png","boy7.png","boy8.png");
  
  
  groundImage = loadImage("ground.png");
  
  
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  sun = createSprite(width-50,100,10,10);
  sun.addAnimation("sun", sunAnimation);
  sun.scale = 0.1
  
  boy = createSprite(50,height-200,20,50); 
  boy.addAnimation("boy", boyImage);
  boy.scale = 0.4
 
  
  invisibleGround = createSprite(width/2,height-20,width,125);  
  invisibleGround.shapeColor = "#f4cbaa";
  
  ground = createSprite(600,686,width,2);
  ground.addImage("ground",groundImage);
 
  ground.velocityX = -(6 + 3*score/100);
 
  
  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
 
   invisibleGround.visible =false

  
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(backgroundImg);
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);
  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")) {
        boy.velocityY = -2;
        jumpSound.play();
    }
    if(boy.y >=100){
        boy.velocityY = boy.velocityY + 1;
    }    
        
    
    
    
   
   
  
    
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(boy)){
       
        gameState = END;
        collidedSound.play();
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
     
    
     
     
      ground.velocityX = 0;
      boy.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
   
     
     obstaclesGroup.setVelocityXEach(0);
    
   }
  
 
  
  boy.collide(invisibleGround);
  
  if(mousePressedOver(restart)) {
      reset();
    }


  drawSprites();
}

function reset(){
    gameState = PLAY;  
    restart.visible = false;

    obstaclesGroup.destroyEach();
    
    boy.changeAnimation("running", boyImage);
    score = 0;
    score = score + Math.round(getFrameRate()/60);
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,height-130,0,0);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
           
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}




