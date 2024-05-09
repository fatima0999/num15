var canvas=document.getElementById("gameCanvas");
var ctx=canvas.getContext("2d");
var player={x:canvas.width/2, y: canvas.hidden /2,size:40};
var bullets=[];
var enemies=[];
for(var i=0; i<10; i++){
    enemies.push({
        //numero aleatorio entre 0 y el ancho del calvas
        x: Math.random()*canvas.width,
        //genera numero de alatorios de 0 y la altura 
        y:(Math.random()* canvas.hidden)/2,size:40,
    });
}
var score=0;
//creamos una imagen nueva para la nave 
var naveImg=new Image();
//establecemos la ruta de la imagen en la 
naveImg.src="nave1.png";
var enemyImg=new Image();
enemyImg.src="nave.png";
//esperamos 

naveImg.onload=function(){
    requestAnimationFrame(gameLoop);
}
enemyImg.onload=function(){
    requestAnimationFrame(gameLoop);
};
function gameLoop(){
    player .x=Math.max(0,Math.min(canvas.width-player.size,player.x));
    player.y=Math.max(0,Math.min(canvas.height -player.size,player.y));
    ctx.clearRect(0,0,canvas.width ,canvas.height);
    ctx.drawImage(naveImg,player.x,player.y,player.size,player.size);
    for (var i=0; i<bullets.length; i++){
        bullets[i].y -=5;
        ctx.fillRect(bullets[i].x,bullets[i].y,bullets[i].size,bullets[i].size);
    }
    for(var i=0; i<enemies.length; i++){
    enemies[i].y +=1;
    if(enemies[i].y >=canvas.height){
        enemies[i]={ x: Math.random()*canvas.width,y:0,size:40};
    }
    ctx.drawImage(
        enemyImg,
        enemies[i].x,
        enemies[i].y,
        enemies[i].size,
        enemies[i].size
    );
}

for(var i =0; i<bullets.length; i++){
    for(var j=0;j< enemies.length;j++){
        if(
            bullets[i].x < enemies[j].x +enemies[j].x +enemies[j].size &&
            bullets[i].x +bullets[i].size >enemies[j].x &&
            bullets[i].y<enemies[j].y +enemies[j].size &&
            bullets[i].y + bullets[i].size>enemies[j].y
        ){
            enemies[j]={x:Math.random()*canvas.width,y:0,size:40};
            bullets.splice(i,1);
            score++;
            break;
        }
    }

}
ctx.font="30px Arial";
ctx.fillText("Score:"+score,10,50);
ctx.fillStyle ="#fff";
requestAnimationFrame(gameLoop);
}

gameLoop();
windo