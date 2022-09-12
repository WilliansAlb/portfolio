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
    if (parseInt(window.innerWidth) > 800) {
        //drawRect(con, can.width / 2, 0, can.width / 2, can.height);
    } else {
        //can.width = window.innerWidth * 3 / 4;
        //can.height = can.width;
        //drawRect(con, 0, can.height / 2, can.width, can.width / 2);
        can.width = (window.innerWidth * 3) / 4;
        can.height = can.width;
    }
    //drawCircle(con, can.width / 2, can.height / 2, (can.width) / 2, 0, Math.PI/2, '#5F4800');
    drawCircle(con, can.width / 2, can.height / 2, (can.width) / 2, Math.PI / 2, 3 * Math.PI / 2, '#d2a203');
    var division = 4;
    var parts = Math.PI / (division - 1);
    //var temp_radius = Math.PI + 1 / 2 * Math.PI;
    var temp_radius = (1 / 2) * Math.PI;
    con.beginPath();
    con.globalCompositeOperation="destination-out";
    for (var i = 0; i < (division - 1); i++) {
        if (temp_radius >= ((1 / 2) * Math.PI) && temp_radius < ((3 / 2) * Math.PI)) {
            var new_radius = temp_radius + parts;
            //var new_radius = ((pos) <= (2 * Math.PI)) ? (pos) : (pos - (2 * Math.PI));
            drawCircleSector(con, can.width / 2, can.width / 2, temp_radius, new_radius, '#5F4800', 10);
            temp_radius = new_radius;
        }
    }
    con.closePath();
    con.save();
    con.globalCompositeOperation = 'destination-out';
    con.beginPath();
    con.arc(can.width / 2, can.height / 2, can.width / 4, 0, 2 * Math.PI, false);
    con.closePath();
    con.fill();
    /* 
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
    **/
}

can.addEventListener("mousemove",(e)=>{
    var canvas = document.getElementById("canvas");
    var pos = findPos(canvas);
    console.log(canvas);
    var x = e.pageX - pos.x;
    var y = e.pageY - pos.y;
    var coord = "x=" + x + ", y=" + y;
    var c = canvas.getContext('2d');
    var p = c.getImageData(x, y, 1, 1).data; 
    var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
    console.log(hex);
});

function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function randomColor() {
    return `rgb(${randomInt(256)}, ${randomInt(256)}, ${randomInt(256)})`
}

function drawRect(ctx, x, y, width, height) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = "#1F1700";
    ctx.fill();
}

function drawCircle(ctx, x, y, radius, deg_initial, deg_final, fill, stroke, strokeWidth) {
    ctx.beginPath()
    ctx.arc(x, y, radius, deg_initial, deg_final, false)
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

function drawCircleSector(ctx, x, y, previous_radius, next_radius, fill, lw) {
    ctx.fillStyle = fill;
    ctx.strokeStyle = "#1F1700"
    ctx.lineWidth = lw;
    ctx.moveTo(x, y);
    ctx.arc(x, y, x, previous_radius, next_radius);
    ctx.lineTo(x, y);
    //ctx.fill();
    ctx.stroke();
}