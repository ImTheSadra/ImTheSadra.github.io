// console.log(innerWidth);
let width = 700;
let height = 500;

// function loop(){
//     // let canvas = document.getElementById("gameWindow");
//     let ctx = document.getElementById("gameWindow").getContext("2d");
//     console.log(ctx);

//     console.clear();
//     console.log(ctx);

//     ctx.fillStyle = "rgb(20,0,20)";
//     ctx.fillRect(0,0,width,height);

//     setTimeout(loop, 300);
// }

function startup(){
    if (innerWidth <= 700){
        return;
    }
    let canvas = document.getElementById("gameWindow");
    canvas.setAttribute("width", width.toString());
    canvas.setAttribute("height", height.toString());
    canvas.setAttribute("class", "display");

    let ctx = canvas.getContext("2d");
    ctx.font = "40px Arial";
    ctx.fillText("soon...", width/2-40, height/2);

    setTimeout(loop, 100);
}

setTimeout(startup, 200);