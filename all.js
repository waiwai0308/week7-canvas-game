var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

var PI = Math.PI;
var PI2 = Math.PI * 2;
var degToPi = Math.PI * 2 / 360;
var ww = 1366;
var wh = 768;
var alpha = 1.0;
var delta = 0.1;
canvas.width = ww;
canvas.height = wh;

//一般計時器
var time = 0;

//進度
var gameStep = 2;

var changeState = "";


class Bullet {
    constructor(args) {
        let def = {
            x: 0,
            y: 0,
            v: {
                x: 0,
                y: 0
            }
        }
        Object.assign(def, args);
        Object.assign(this, def);
    }
    update() {
        this.x += this.v.x;
        this.y += this.v.y;
    }
    draw() {
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = "white";
        ctx.arc(0, 0, 3, 0, PI2);
        ctx.fill();
        ctx.restore();
    }
}

class Ship {
    constructor(args) {
        let def = {
            x: 0,
            y: 0,
            r: 50,
            deg: 50 * degToPi
        }
        Object.assign(def, args);
        Object.assign(Ship, def);
    }
    draw() {
        //船
        ctx.save();
        ctx.rotate(Ship.deg * PI2 / 360);
        ctx.beginPath();
        ctx.arc(0, 0, Ship.r, 0, PI2);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 6;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "white";
        ctx.stroke();
        for (var i = 0; i < 3; i++) {
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -Ship.r);
            ctx.stroke();
            ctx.rotate(PI2 / 3);
        }
        ctx.beginPath();
        ctx.rotate(PI2 / 8);
        ctx.arc(0, 0, 80, 0, PI2 / 4);
        ctx.stroke();

        bullets.forEach(b => b.draw());

        //船虛線
        ctx.beginPath();
        ctx.rotate(PI2 / 8);
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 5]);
        ctx.arc(0, 0, Ship.r + 18, 0, PI2);
        ctx.stroke();

        //發射器
        ctx.beginPath();
        ctx.moveTo(-Ship.r - 9, 10);
        ctx.lineTo(-Ship.r - 9, -10);
        ctx.lineTo(-Ship.r - 25, -10);
        ctx.lineTo(-Ship.r - 40, -3);
        ctx.lineTo(-Ship.r - 40, 3);
        ctx.lineTo(-Ship.r - 25, 10);

        ctx.fillStyle = 'white'
        ctx.fill();
        ctx.restore();
    }

}
var ship;
function init() {
    ship = new Ship({
        deg: 0 * degToPi,
        r: 45
    })
}

var bullets = [];
function update() {
    time++;
    TweenMax.to(ctx, 0.3, {
        globalAlpha: alpha.toFixed(1)
    })

    if (gameStep === 1) {
        startbtn.style = "display:block;";
        exitbtn.style = "display:none;";
    }
    if (gameStep === 2) {
        startbtn.style = "display:none;";
        exitbtn.style = "display:block;";
    }

    if (time % 30 == 0) {
        var b = new Bullet({
            x: -65,
            y: -65,
            v: {
                x: Math.cos(Ship.deg) * 10,
                y: Math.sin(Ship.deg) * 10,
            }
        });
        bullets.push(b);
        bullets.forEach(b => b.update());
    }


}
function draw() {
    ctx.clearRect(0, 0, ww, wh);

    if (gameStep === 1) {
        drawStep1();
    }
    if (gameStep === 2) {
        drawStep2();
    }

    requestAnimationFrame(draw);
}

//執行
init();
setInterval(update, 1000 / 120);
requestAnimationFrame(draw);

// 開始遊戲
const startbtn = document.querySelector(".start");
startbtn.addEventListener("click", function (e) {
    e.preventDefault();
    fadeOut(1, 2);
});
const exitbtn = document.querySelector(".exit");
exitbtn.addEventListener("click", function (e) {
    e.preventDefault();
    fadeOut(2, 1);
});

function fadeOut(step, tostep) {
    alpha -= delta;
    if (alpha < 0) {
        alpha = 0;
        gameStep = tostep;
        fadeIn(tostep);
        return;
    }
    if (alpha < 0.1) {
        setTimeout("fadeOut(" + step + "," + tostep + ")", 300);
    } else {
        setTimeout("fadeOut(" + step + "," + tostep + ")", 100);
    }

}

function fadeIn(step) {
    alpha += delta;
    if (alpha > 1) {
        alpha = 1;
        return;
    }
    setTimeout("fadeIn(" + step + ")", 100);
}

document.addEventListener("keydown", function (e) {
    if (gameStep === 2) {
        if (e.key === "ArrowRight") {
            if (Ship.deg === 360) {
                Ship.deg = 0;
            }
            TweenMax.to(Ship, 0.15, {
                deg: Ship.deg + 5
            })
        }
        if (e.key === "ArrowLeft") {
            if (Ship.deg === 0) {
                Ship.deg = 360;
            }
            TweenMax.to(Ship, 0.15, {
                deg: Ship.deg - 5
            })
        }
    }
});

function drawStep2() {
    ctx.clearRect(0, 0, ww, wh);

    ctx.beginPath();
    ctx.lineWidth = 1;
    for (var i = 0; i < ww; i++) {
        let wt = ww % 50;
        let pos = i * 50;
        ctx.moveTo(pos + wt / 2, 0);
        ctx.lineTo(pos + wt / 2, wh);
    }
    for (var i = 0; i < wh; i++) {
        let ht = wh % 50;
        let pos = i * 50;
        ctx.moveTo(0, pos + ht / 2);
        ctx.lineTo(ww, pos + ht / 2);
    }
    ctx.strokeStyle = "rgba(255,255,255,0.1)"
    ctx.stroke();

    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.font = "36px '微軟正黑體'";
    ctx.fillText("RADIO Defense", 25, 160);
    ctx.font = "128px '微軟正黑體'";
    ctx.fillText("R", 15, 120);

    ctx.save();

    ctx.translate(ww / 2, wh / 2);
    ship.draw();

    ctx.restore();

    ctx.font = "24px '微軟正黑體'";
    ctx.fillText("Key → to turn right", 20, 700);
    ctx.fillText("Key ← to turn left", 20, 740);
    ctx.font = "72px '微軟正黑體'";
    ctx.fillText("00:43”", 570, 80);
}

function drawStep1() {
    //大圓圈
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.arc(ww / 2, wh / 2, 350, 0, PI2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(ww / 2, wh / 2, time % 450 + 350, 0, PI2);
    ctx.stroke();

    //小圓圈
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255,255,255,1)";
    ctx.lineWidth = 2;
    ctx.arc(ww / 2, wh / 2, 240, 0, PI2);
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
    ctx.fillStyle = "#3677BB";
    ctx.fill();

    //電池
    ctx.beginPath();
    ctx.fillStyle = "rgb(243,176,65)";
    ctx.fillRect(580, 300, 50, 80);
    ctx.fillRect(580, 385, 50, 10);
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillRect(590, 290, 30, 10);
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
    ctx.fillText("R", 680, 395);
}
