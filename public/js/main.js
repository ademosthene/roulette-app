const bet = document.getElementById("bet")
const balance = document.getElementById("balance")
const choice = document.querySelectorAll(".choice")
const won = document.getElementById("won")
const lost = document.getElementById("lost")

var options = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];

var startAngle = 0;
var arc = Math.PI / (options.length / 2);
var spinTimeout = null;

var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;

var ctx;

balance.textContent = 1000

let choiceCheck= ""
let choiceIndex= null
let choiceStyle = ""

// User Bet Choice
for(let i = 0; i<choice.length; i++){
  choice[i].addEventListener("click", function(e){
    e.preventDefault()
    choiceCheck = choice[i].textContent
    choiceIndex = i
    console.log(choiceCheck)
  })
}


// Play Game
document.getElementById("spin").addEventListener("click", spin);
function byte2Hex(n) {
  var nybHexString = "0123456789ABCDEF";
  return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

function RGB2Color(r,g,b) {
	return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function getColor(item, maxitem) {
    if(item === 0){
        return RGB2Color(0, 255, 0)
    }else if(item % 2 === 0){
        return RGB2Color(0, 0, 0)
    }else{
        return RGB2Color(255, 0, 0)
    }
}

function drawRouletteWheel() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var outsideRadius = 200;
    var textRadius = 160;
    var insideRadius = 125;

    ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,500,500);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.font = 'bold 12px Helvetica, Arial';

    for(var i = 0; i < options.length; i++) {
      var angle = startAngle + i * arc;
      //ctx.fillStyle = colors[i];
      ctx.fillStyle = getColor(i, options.length);

      ctx.beginPath();
      ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
      ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();

      ctx.save();
      ctx.shadowOffsetX = -1;
      ctx.shadowOffsetY = -1;
      ctx.shadowBlur    = 0;
      ctx.shadowColor   = "rgb(220,220,220)";
      ctx.fillStyle = "white";
      ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius,
                    250 + Math.sin(angle + arc / 2) * textRadius);
      ctx.rotate(angle + arc / 2 + Math.PI / 2);
      var text = options[i];
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.restore();
    }

    //Arrow
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
    ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.fill();
  }
}

function spin() {
  spinAngleStart = Math.random() * 10 + 10;
  spinTime = 0;
  spinTimeTotal = Math.random() * 3 + 4 * 1000;
  rotateWheel();
  // value of the bet
  console.log(bet.value)
}

function rotateWheel() {
  spinTime += 30;
  if(spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI / 180);
  drawRouletteWheel();
  spinTimeout = setTimeout('rotateWheel()', 30);
}

function stopRotateWheel() {
  clearTimeout(spinTimeout);
  var degrees = startAngle * 180 / Math.PI + 90;
  var arcd = arc * 180 / Math.PI;
  var index = Math.floor((360 - degrees % 360) / arcd);
  ctx.save();
  ctx.font = 'bold 30px Helvetica, Arial';
  var text = options[index]
  checkWin(text)
  ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
  ctx.restore();
}

function checkWin(num){
    // will check if the bet is on
    let winnings = 0;
    let losings = 0;
    let orderNum = Array.from(Array(37).keys())

      if(choiceCheck === "2:1" && choiceIndex === 13) {
        const colOne = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
        if(Number(choiceCheck) === 0){
          losings = Number(bet.value) * 2
          lost.textContent = losings
        }else if (colOne.includes(num)) {
          winnings = Number(bet.value) * 2
          won.textContent = winnings
        }else{
          losings = Number(bet.value) * 2
          lost.textContent = losings
        }
      }else if(choiceCheck === "2:1" && choiceIndex === 26) {
        const colTwo = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
        if(Number(choiceCheck) === 0){
          losings = Number(bet.value) * 2
          lost.textContent = losings
        }else if (colTwo.includes(num)) {
          winnings = Number(bet.value) * 2
          won.textContent = winnings
        }else{
          losings = Number(bet.value) * 2
          lost.textContent = losings
        }
      }else if(choiceCheck === "2:1" && choiceIndex === 39) {
        const colThree = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
        if(Number(choiceCheck) === 0){
          losings = Number(bet.value) * 2
          lost.textContent = losings
        }else if (colThree.includes(num)) {
          winnings = Number(bet.value) * 2
          won.textContent = winnings
        }else{
          losings = Number(bet.value) * 2
          lost.textContent = losings
        }
      }else if(choiceCheck === "1st 12"){
        const first = orderNum.slice(1,13)
        if(Number(choiceCheck) === 0){
          losings = Number(bet.value) * 3
          lost.textContent = losings
        }else if (first.includes(num)) {
          winnings = Number(bet.value) * 3
          won.textContent = winnings
        }else{
          losings = Number(bet.value) * 3
          lost.textContent = losings
        }
      }else if(choiceCheck === "2nd 12"){
        const second = orderNum.slice(13,25)
        if(Number(choiceCheck) === 0){
          losings = Number(bet.value) * 3
          lost.textContent = losings
        }else if (second.includes(num)) {
          winnings = Number(bet.value) * 3
          won.textContent = winnings
        }else{
          losings = Number(bet.value) * 3
          lost.textContent = losings
        }
      }else if(choiceCheck === "3rd 12"){
        const third = orderNum.slice(25,37)
        if(Number(choiceCheck) === 0){
          losings = Number(bet.value) * 3
          lost.textContent = losings
        }else if (third.includes(num)) {
          winnings = Number(bet.value) * 3
          won.textContent = winnings
        }else{
          losings = Number(bet.value) * 3
          lost.textContent = losings
        }
      }else if(choiceCheck === "1-18"){
        const begin = orderNum.slice(1,19)
        if(Number(choiceCheck) === 0){
          losings = Number(bet.value) * 2
          lost.textContent = losings
        }else if (begin.includes(num)) {
          winnings = Number(bet.value) * 2
          won.textContent = winnings
        }else{
          losings = Number(bet.value) * 2
          lost.textContent = losings
        }
      }else if(choiceCheck === "18-36"){
        const last = orderNum.slice(19,37)
        if(Number(choiceCheck) === 0){
          losings = Number(bet.value) * 2
          lost.textContent = losings
        }else if (last.includes(num)) {
          winnings = Number(bet.value) * 2
          won.textContent = winnings
        }else{
          losings = Number(bet.value) * 2
          lost.textContent = losings
        }
      }else if(choiceCheck === "Even"){
        if(num === 0 || num % 2 != 0){
          losings = Number(bet.value) * 2
          lost.textContent = losings
        }else{
          winnings = Number(bet.value) * 2
          won.textContent = winnings
        }
      }else if(choiceCheck === "Odd"){
        if(num === 0 || num % 2 === 0){
          losings = Number(bet.value) * 2
          lost.textContent = losings
        }else{
          winnings = Number(bet.value) * 2
          won.textContent = winnings
        }
      }else if(choiceCheck === "Red"){
        const reds = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
        if(Number(choiceCheck) === 0){
          losings = Number(bet.value) * 2
          lost.textContent = losings
        }else if (reds.includes(num)) {
          winnings = Number(bet.value) * 2
          won.textContent = winnings
        }else{
          losings = Number(bet.value) * 2
          lost.textContent = losings
        }
      }else if(choiceCheck === "Black"){
        const black = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]
        if(Number(choiceCheck) === 0){
          losings = Number(bet.value) * 2
          lost.textContent = losings
        }else if (black.includes(num)) {
          winnings = Number(bet.value) * 2
          won.textContent = winnings
        }else{
          losings = Number(bet.value) * 2
          lost.textContent = losings
        }
      }else{
      if(Number(choiceCheck) === 0){
        losings = Number(bet.value) * 36
        lost.textContent = losings
      }else if (Number(choiceCheck) === num){
        winnings = Number(bet.value) * 36
        won.textContent = winnings
      }else{
        losings = Number(bet.value) * 36
        lost.textContent = losings
      }
    }


  console.log(num)
}

function easeOut(t, b, c, d) {
  var ts = (t/=d)*t;
  var tc = ts*t;
  return b+c*(tc + -3*ts + 3*t);
}

drawRouletteWheel();
