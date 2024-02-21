// old game.js file

let angle2 = 0;

function setup(){
    noCanvas();
}

function draw(){
    var icon = document.getElementById("icon");
    icon.style = "transform: rotate("+angle2.toString()+"deg);";
    angle2 += 1;
}