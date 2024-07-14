const width = 700;
const height = 500;

let drops = [];

function setup(){
    if (innerWidth <= 700){
        return;
    }
    createCanvas(width, height);
    document.getElementsByTagName("canvas").item(0).addEventListener("click", (ev)=>{
        let r = document.getElementById("rSize");
        // console.log(r.value);
        let drop = new Drop(mouseX, mouseY, Number(r.value));
        for(other of drops){
            other.marble(drop);
        }
        drops.push(drop);
    });
}

function draw(){
    background(51);

    for (let drop of drops){
        drop.draw();
    }
}