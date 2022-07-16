const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
//スタート画面
ctx.textAlign = "center";
ctx.font = "50px Lucida Console";
ctx.fillStyle = "#2f4f4f";
ctx.fillText("START", canvas.width/2, canvas.height/2);
ctx.font = "20px Arial";
ctx.fillText("press \"SPACE\" key", canvas.width/2, canvas.height/2+50);


//マスの大きさ
const grid = 16;
//マスの数
//400/16 = 25
const stage = canvas.width / grid;
//intervalIDを格納
let intervId;

//アイテム
const item = {
    x: null,
    y: null,

    update: function() {
        ctx.fillStyle = 'firebrick';
        ctx.fillRect(this.x*grid, this.y*grid, grid-1, grid-1)
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

        ctx.fillStyle = 'darkolivegreen';
        this.body.forEach(obj => {
            ctx.fillRect(obj.x*grid, obj.y*grid, grid-1, grid-1);
            if(this.x === obj.x && this.y === obj.y) pause(); 
        })
        if(this.body.length > this.tail) this.body.shift();
    }
};

//ループ開始
function start(e) {
    if(e.key === ' '){
        init();
        intervId = setInterval(loop,1000/20);
    }
}

//初期化
const init = () => {
    //スネークの初期位置
    snake.x = Math.floor(stage / 2);
    snake.y = Math.floor(stage / 2);
    //スネークの初期の長さ
    snake.tail = 4;
    //スネークの体の各座標を保持
    snake.body = []
    item.x = getRandomInt(0, stage);
    item.y = getRandomInt(0, stage);
};

//ループ
const loop = () => {
    document.removeEventListener('keyup', start);
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
        item.x = getRandomInt(0, stage);
        item.y = getRandomInt(0, stage);
    }

};

//minからmaxまでのランダムな整数値を返す
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) +min;
}

//当たり判定
function collision(){
    if(snake.x < 0 || snake.x > stage-1){
        return true;
    }
    if(snake.y < 0 || snake.y > stage-1){
        return true;
    }
    return false;
}

//一時停止
function pause(){
    clearInterval(intervId);

    ctx.textAlign = "center";
    ctx.font = "50px Lucida Console";
    ctx.fillStyle = "#8b4513";
    ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2);
    ctx.font = "18px Arial";
    ctx.fillText(`score: ${snake.body.length-4}`, canvas.width/2, canvas.height/2+25);
    ctx.fillStyle = "#2f4f4f";
    ctx.fillText("press \"SPACE\" key to restart", canvas.width/2, canvas.height/2+75);

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
document.addEventListener('keyup', start)
