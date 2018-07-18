var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');

var PI = Math.PI;
var PI2 = Math.PI * 2;

canvas.width = 1366;
canvas.height = 768;

var time = 0;

function init() {

}
function update() {

}
function draw() {
    time++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //大圓圈
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.arc(canvas.width / 2, canvas.height / 2, 350, 0, PI2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, (time % 450) + 350, 0, PI2);
    ctx.stroke();

    //小圓圈
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255,255,255,1)';
    ctx.lineWidth = 2;
    ctx.arc(canvas.width / 2, canvas.height / 2, 240, 0, PI2)
    ctx.stroke();

    //黃色圈圈
    ctx.beginPath();
    ctx.arc(1160, 160, 60, 0, PI2);
    ctx.fillStyle = "rgb(244, 174, 94)";
    ctx.fill();

    //不規則形狀
    ctx.beginPath();
    ctx.moveTo(100, 200);
    ctx.lineTo(175, 170);
    ctx.lineTo(250, 200);
    ctx.lineTo(250, 250);
    ctx.lineTo(220, 290);
    ctx.lineTo(120, 260);
    ctx.closePath();
    ctx.fillStyle = "#e7465d";
    ctx.fill();

    //三角形
    ctx.beginPath();
    ctx.moveTo(930, 680);
    ctx.lineTo(1070, 700);
    ctx.lineTo(1020, 570);
    ctx.closePath();
    ctx.fillStyle = "#F6AF5F";
    ctx.fill();

    //電池
    ctx.beginPath();
    ctx.fillStyle='rgb(243,176,65)';
    ctx.fillRect(580,300,50,80);
    ctx.fillRect(580,385,50,10);
    ctx.fillStyle='rgb(255,255,255)';
    ctx.fillRect(590,290,30,10);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(608, 320);
    ctx.lineTo(593, 345);
    ctx.lineTo(608, 345);
    ctx.lineTo(598, 365);
    ctx.lineTo(618, 340);
    ctx.lineTo(603, 340);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();

    //文字
    ctx.font = "24px '微軟正黑體'";
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillText("你身負著運送能量電池的任務", 40, 650);
    ctx.fillText("卻遭到幾何星人的埋伏", 40, 690);
    ctx.fillText("請協助從他們的手中奪回能量電池", 40, 730);
    ctx.font = "36px '微軟正黑體'";
    ctx.fillText("Radio Defense", 560, 450);
    ctx.font = "128px '微軟正黑體'";
    ctx.fillText('R',680,395)


    requestAnimationFrame(draw);
}

init()

setInterval(update, 30);
requestAnimationFrame(draw);


const startbtn = document.querySelector('.btn');
startbtn.addEventListener('click', function (e) {
    e.preventDefault();
    gameStep = 2;
});

