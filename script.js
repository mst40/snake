'use strict';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

//マスの数
const grid = 20;
//マスの大きさ(px)
const stage = canvas.width / grid;
//intervalIDを格納
let intervId;

//アイテム
const item = {
    x: null,
    y: null,

    update: function() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x*grid, this.y* grid, grid, grid)
    }
};

//スネーク
const snake = {
    //スネークの座標
    //max　grid
    x: null,
    y: null,
    //スネークのベクトル
    dx: 1,
    dy: 0,
    //スネークの長さ
    tail: null,

    update: function() {
        this.body.push({x: this.x, y: this.y});
        this.x += this.dx;
        this.y += this.dy;

        ctx.fillStyle = 'green';
        this.body.forEach(obj => {
            ctx.fillRect(obj.x*grid, obj.y*grid, grid-1, grid-1);
            if(this.x === obj.x && this.y === obj.y) init() 
        })
        if(this.body.length > this.tail) this.body.shift();
    }
};

//スタート
function start(e) {
    if(e.key === ' '){
        init();
        intervId = setInterval(loop,1000/5);
    }
}

//初期化
const init = () => {
    //スネークの初期位置
    snake.x = stage / 2;
    snake.y = stage / 2;
    //スネークの初期の長さ
    snake.tail = 4;
    //スネークの体の各座標を保持
    snake.body = []

    item.x = Math.floor(Math.random() * stage);
    item.y = Math.floor(Math.random() * stage);
};

//ループ
const loop = () => {
    document.removeEventListener('keydown', start);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.update();
    item.update();
 //衝突
    if(collision()){
        pause();
    }   

 //りんごを食べて長くなる
    if(snake.x === item.x && snake.y === item.y){
        snake.tail++;
        item.x = Math.floor(Math.random() * stage);
        item.y = Math.floor(Math.random() * stage);
    }

};

//衝突の検知
function collision(){
    if(snake.x < -1 || snake.x > stage){
        return true;
    }
    if(snake.y < -1|| snake.y > stage){
        return true;
    }
    return false;
}

//一時停止
function pause(){
    clearInterval(intervId);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#cccccc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = "center";
    ctx.font = "50px Lucida Console";
    ctx.fillStyle = "black";
    ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2);
    ctx.font = "15px Arial";
    ctx.fillText("press \"SPACE\" to restart", canvas.width/2, canvas.height/2+100);

    document.addEventListener('keydown', start);
}

 //操作
    document.addEventListener('keydown', e => {
        if(e.key === 'ArrowLeft' && snake.dx === 0) {
            snake.dx = -1;
            snake.dy = 0;
        }
        else if(e.key === 'ArrowRight' && snake.dx === 0) {
            snake.dx = +1;
            snake.dy = 0;
        }
        else if(e.key === 'ArrowUp' && snake.dy === 0) {
            snake.dx = 0;
            snake.dy = -1;
        }
        else if(e.key === 'ArrowDown' && snake.dy === 0) {
            snake.dx = 0;
            snake.dy = +1;
        }
    });

//スタート
document.addEventListener('keydown', start)
