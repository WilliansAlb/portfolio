/** @type {HTMLCanvasElement} */
var can = document.getElementById("canvas");
/** @type {HTMLCanvasElement} */
var con = can.getContext("2d");
var profileImg = document.createElement('img');

window.onload = () => {
    profileImg.src = 'public/img/profile.jpg';
    profileImg.onload = function () {
        drawProfileRoulette();
    };
};

window.onresize = () => {
    drawProfileRoulette();
};

function drawProfileRoulette() {
    can.width = window.innerWidth / 3;
    can.height = can.width;
    console.log(window.innerWidth);
    if (parseInt(window.innerWidth) > 800) {
        drawRect(con, can.width / 2, 0, can.width / 2, can.height);
    } else {
        can.width = window.innerWidth * 3 / 4;
        can.height = can.width;
        drawRect(con, 0, can.height / 2, can.width, can.width / 2);
    }
    drawCircle(con, can.width / 2, can.height / 2, (can.width) / 2, '#5F4800', 1);
    var division = 7;
    var parts = 2 * Math.PI / division;
    var temp_radius = Math.PI+1/2*Math.PI;
    con.beginPath();
    for (var i = 0; i <= division; i++) {
        var pos = temp_radius + parts;
        var new_radius = ((pos)<=(2*Math.PI))?(pos):(pos-(2*Math.PI));
        drawCircleSector(con, can.width/2, can.width/2, temp_radius, new_radius, '000');
        temp_radius = new_radius;
    }
    con.closePath()
    con.save();
    con.beginPath();
    con.arc(can.width / 2, can.height / 2, can.width / 4, 0, Math.PI * 2, true);
    con.closePath();
    con.clip();
    con.drawImage(profileImg, can.width / 4, can.height / 4, can.height / 2, can.height / 2);
    con.beginPath();
    con.arc(can.width / 2, can.height / 2, can.width / 4, 0, Math.PI * 2, true);
    con.clip();
    con.closePath();
    con.restore();
}

function drawRect(ctx, x, y, width, height) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = "#1F1700";
    ctx.fill();
}

function drawCircle(ctx, x, y, radius, fill, stroke, strokeWidth) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
    if (fill) {
        ctx.fillStyle = fill
        ctx.fill()
    }
    if (stroke) {
        ctx.lineWidth = strokeWidth
        ctx.strokeStyle = stroke
        ctx.stroke()
    }
}

function drawCircleSector(ctx, x, y, previous_radius, next_radius, fill) {
    ctx.fillStyle = fill;
    ctx.strokeStyle = "#1F1700"
    ctx.lineWidth = 5;
    ctx.moveTo(x, y);
    ctx.arc(x, y, x, previous_radius, next_radius);
    ctx.lineTo(x, y);
    ctx.fill();
    ctx.stroke();
}