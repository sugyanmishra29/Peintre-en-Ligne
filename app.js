var canvas = document.getElementById("draw");
var ctx = canvas.getContext("2d");
var pen = document.getElementById("pen");
var brush = document.getElementById("brush");
var erase = document.getElementById("erase");
var download = document.getElementById("download");
var upload = document.getElementById("upload");
resize();

function resize() {
    ctx.canvas.width = 800;
    ctx.canvas.height = 600;
    ctx.lineCap = "round";
}
window.addEventListener("resize", resize);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", setPosition1);
canvas.addEventListener("mouseenter", setPosition1);
pen.addEventListener("mousedown", changePen);
brush.addEventListener("mousedown", changebrush);
erase.addEventListener("mousedown", resize);
download.addEventListener("click", function(e) {


    var image = canvas.toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);

});


upload.addEventListener('change', function(ev) {
    if (ev.target.files) {
        let file = ev.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function(e) {
            var image = new Image();
            image.src = e.target.result;
            image.onload = function(ev) {
                canvas.style.background = image;
            }
        }
    }
});

ctx.lineCap = "round";

function changePen(e) {
    ctx.lineCap = "round";
}

function changebrush(e) {
    ctx.lineCap = "square";
}

var pos = { x: 0, y: 0 };

function setPosition(e, elemt) {
    var rect = elemt.getBoundingClientRect();
    pos.x = Math.floor(e.clientX - rect.left);
    pos.y = Math.floor(e.clientY - rect.top);
}

function setPosition1(e) {
    setPosition(e, ctx.canvas);
}

function draw(e) {
    if (e.buttons !== 1) return;
    var color = document.getElementById("hex").value;
    var wd = document.getElementById("wd").value;
    ctx.beginPath();
    ctx.lineWidth = wd;
    ctx.strokeStyle = color;
    ctx.moveTo(pos.x, pos.y);
    setPosition(e, ctx.canvas);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
}