'use strict';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
//マスの数
const grid = 20;
const stage = canvas.width / grid;

const item = {
    x: null,
    y: null,

    update: function() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x*grid, this.y* grid, grid, grid)
    }
};
const snake = {
    x: null,
    y: null,
    //スネークのベクトル
    dx: 1,
    dy: 0,
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
//初期化
const init = () => {
    //スネークの初期位置
    snake.x = stage / 2;
    snake.y = stage / 2;
    //スネークの初期の長さ
    snake.tail = 4;
    //スネークの体の座標を保持
    snake.body = []

    item.x = Math.floor(Math.random() * stage);
    item.y = Math.floor(Math.random() * stage);
};
//ループ
const loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.update();
    item.update();

    if(snake.x === item.x && snake.y === item.y){
        snake.tail++;
        item.x = Math.floor(Math.random() * stage);
        item.y = Math.floor(Math.random() * stage);
    }
    if(collision()){
        pause();
    }
};
//衝突の検知
function collision(){
    if(snake.x < 0 || snake.x > stage){
        return true;
    }
    if(snake.y < 0 || snake.y > stage){
        return true;
    }
    return false;
}
//一時停止
function pause(){
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#cccccc";
    ctx.textAlign = "center"
    ctx.font = "50px Lucida Console";
    ctx.fillStyle = "black";
    ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2);
    ctx.font = "15px Arial";
    ctx.fillText("press \"SPACE\" to restart", canvas.width/2, canvas.height/2+100);
    ctx.restore();

}
//スタート
document.addEventListener('keydown', e => {
    if(e.key === ' '){
        init();
        setInterval(loop,1000/15);
    }
    console.log(snake)
})
document.addEventListener('keydown', e => {
    switch(e.key) {
        case 'ArrowLeft':
            snake.dx = -1;
            snake.dy = 0;
            break;
        case 'ArrowRight':
            snake.dx = +1;
            snake.dy = 0;
            break;
        case 'ArrowUp':
            snake.dx = 0;
            snake.dy = -1;
            break;
        case 'ArrowDown':
            snake.dx = 0;
            snake.dy = +1;
            break;
    }
});