var bg,box,coin,grnd,player,igrnd,pipe;
var BoxGroup,CoinGroup,PipeGroup;
var score=0;
var Play=1;
var End=0;
var GameState=Play;
var GameOver,restart;

function preload(){

bg=loadImage("background.webp");
box=loadImage("box.webp");
coin=loadImage("coin.webp");
grnd=loadImage("ground.png")
playerimg=loadImage("super_hero-removebg-preview.png");
GameOver=loadImage("gameOver.png");
restart=loadImage("restart.png");
pipe=loadImage("pipes.png")

}

function setup(){
createCanvas(1000,500);

ground=createSprite(500,490,1000,20);
ground.addImage(grnd);

BoxGroup=createGroup();

PipeGroup=createGroup();

CoinGroup=createGroup();

player=createSprite(50,470,20,20);
player.addImage(playerimg);
player.scale=0.6;
player.setCollider("rectangle",0,0,50,player.height);

igrnd=createSprite(500,495,1000,20);
igrnd.visible=false;

Restart=createSprite(500,300,20,20);
Restart.addImage(restart)
Restart.scale=0.2;
Restart.visible=false;

Gameover=createSprite(500,250,20,20);
Gameover.addImage(GameOver)
Gameover.scale=0.2;
Gameover.visible=false;

}

function draw(){
background(bg);

textSize(28);
fill("red");
text("score:"+score,840,50);

if(GameState===Play){





ground.velocityX=-3;
if(ground.x<0){

ground.x=ground.width/2;

}

igrnd.velocityX=-3;
if(igrnd.x<0){

igrnd.x=igrnd.width/2;

}



if(BoxGroup.isTouching(player)){

GameState=End;    

}

if(PipeGroup.isTouching(player)){

    GameState=End;    
    
}

if(keyDown("space")){

player.velocityY=-10;

}


player.velocityY=player.velocityY+0.5;

if(CoinGroup.isTouching(player)){
    
for(var i=0;i<CoinGroup.length;i=i+1){

if(CoinGroup[i].isTouching(player)){

CoinGroup[i].destroy();
score=score+4

}

}

}

spawnBox();
spawnCoin();
spawnPipe();

}

else if(GameState===End){

    BoxGroup.setVelocityXEach(0);
    PipeGroup.setVelocityXEach(0);
    player.velocityY=0;
    ground.velocityX=0;
    CoinGroup.setVelocityXEach(0);
    BoxGroup.setLifetimeEach(-1);
    PipeGroup.setLifetimeEach(-1);
    CoinGroup.setLifetimeEach(-1);
    Gameover.visible=true;
    Restart.visible=true;

}

if (mousePressedOver(Restart)){

GameState===Play;
CoinGroup.destroyEach();
BoxGroup.destroyEach();
PipeGroup.destroyEach();
score=0;

}

player.collide(igrnd);


drawSprites();

}

function spawnBox(){

if(frameCount%200===0){

    box1=createSprite(1000,450,50,50);
    box1.y=random(200,400)
    box1.addImage(box);
    box1.scale=0.3;
    box1.velocityX=-3;    
    BoxGroup.add(box1);

}

}

function spawnPipe(){

    if(frameCount%250===0){
    
        pipes=createSprite(1000,450,50,50);
        pipes.y=random(200,400)
        pipes.addImage(pipe);
        pipes.scale=0.3;
        pipes.velocityX=-3;    
        PipeGroup.add(box1);
    
    }
    
    }

function spawnCoin(){

if(frameCount%150===0){

    coin1=createSprite(1000,200,50,50);
    coin1.y=random(100,300);
    coin1.addImage(coin);
    coin1.scale=0.1;
    coin1.velocityX=-4;
    CoinGroup.add(coin1);

}


}

