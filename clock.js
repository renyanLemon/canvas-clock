var dom = document.getElementById('clock');
// getContext() 方法返回一个用于在画布上绘图的环境。
var ctx = dom.getContext('2d');
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width / 2;
var rem = width / 300;

function drawBackground() {
  ctx.save();
  //画圆
  ctx.translate(r, r);
  ctx.beginPath();
  ctx.lineWidth = 10 * rem;
  ctx.arc(0, 0, r - 5, 0, 2*Math.PI, false);
  ctx.stroke();
  //画时间点
  var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  hourNumbers.forEach(function(number, i) {
    var rad = 2 * Math.PI / 12 * i;
    var x = Math.cos(rad) * (r - 30);
    var y = Math.sin(rad) * (r - 30);
    ctx.fillText(number, x, y);
  })
  //画秒钟点
  for(var i = 0; i < 60; i++) {
    var rad = 2 * Math.PI / 60 * i;
    var x = Math.cos(rad) * (r - 16);
    var y = Math.sin(rad) * (r - 16);
    ctx.beginPath();
    if(i % 5 === 0) {
      ctx.fillStyle = "#000";
      ctx.arc(x, y, 2, 0, 2*Math.PI, false);
    } else {
      ctx.fillStyle = "#ccc";
      ctx.arc(x, y, 2, 0, 2*Math.PI, false);
    }
    ctx.fill();

  }
}

function drawHour(hour, minute) {
  ctx.save();
  ctx.beginPath();
  var rad = 2 * Math.PI / 12 * hour;
  var mrad =  2 * Math.PI / 12 / 60 * minute;
  ctx.rotate(rad + mrad);
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  ctx.moveTo(0, 10);
  ctx.lineTo(0, -r / 2);
  ctx.stroke();
  ctx.restore();
}

function drawMinute(minute) {
  ctx.save();
  ctx.beginPath();
  var rad = 2 * Math.PI / 60 * minute;
  ctx.rotate(rad);
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.moveTo(0, 10);
  ctx.lineTo(0, -r + 60);
  ctx.stroke();
  ctx.restore();
}

function drawSecond(second) {
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle="#c14543";
  var rad = 2 * Math.PI / 60 * second;
  ctx.rotate(rad);
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.moveTo(-2, 20);
  ctx.lineTo(2, 20);
  ctx.lineTo(1, -r + 18);
  ctx.lineTo(-1, -r + 18);
  ctx.fill();
  ctx.restore();
}

function drawDot() {
  ctx.beginPath();
  ctx.fillStyle = '#fff';
  ctx.arc(0, 0, 3, 0, 2 * Math.PI, false);
  ctx.fill();
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  drawBackground();
  drawHour(hour, minute);
  drawMinute(minute);
  drawSecond(second);
  drawDot();
  ctx.restore();
}
draw();
setInterval(draw, 1000);
