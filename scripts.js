window.onload = () => {
    /** @type {HTMLCanvasElement} */
    var can = document.getElementById("canvas");
    /** @type {HTMLCanvasElement} */
    var con = can.getContext("2d");
    var thumbImg = document.createElement('img');
    thumbImg.src = 'profile.jpg';
    thumbImg.onload = function () {
        drawRect(con, can.width / 2, 0, can.width / 2, can.height);
        drawCircle(con, can.width / 2, can.height / 2, (can.width) / 2, '#5F4800', 1);
        con.save();
        con.beginPath();
        con.arc(can.width / 2, can.height / 2, can.width / 4, 0, Math.PI * 2, true);
        con.closePath();
        con.clip();
        con.drawImage(thumbImg, can.width / 4, can.height / 4, can.height / 2, can.height / 2);
        con.beginPath();
        con.arc(can.width / 2, can.height / 2, can.width / 4, 0, Math.PI * 2, true);
        con.clip();
        con.closePath();
        con.restore();
    };
};

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