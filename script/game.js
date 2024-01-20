let mapSize, tileSize;
let FOV = Math.PI/4;
let HALF_FOV = FOV / 2;
let castedRays = 120;
let stepAngle = FOV / castedRays;
let maxDepth, SCALE, wallWidth;

playerx = 0;
playery = 0;
playera = 0;

function toInt(num){
    var result = Math.round(num);
    if (result > num){
        result += 1;
    }
    return result;
}

let map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

function setup(){
    createCanvas(700, 500);

    var main = document.getElementsByTagName("main").item(0);
    main.style = "display: none; max-width: 700; max-height: 500;";
    main.id = "main";

    main.className = "window";

    // var window = document.getElementById("window");
    // window.children = [main];

    mapSize = 10;
    tileSize = (width/3)/mapSize;
    maxDepth = (mapSize*tileSize)*2;
    SCALE = (width / 2) / castedRays;
    wallWidth = width / castedRays;
    playerx = mapSize/2*tileSize;
    playery = mapSize/2*tileSize;
}

function castRays(){
    let angle = playera+HALF_FOV;

    for (let ray = 0; ray < castedRays; ray++){
        for(let depth = 0; depth < maxDepth; depth++){
            let tx, ty;
            tx = playerx-(Math.sin(angle)*depth);
            ty = playery+(Math.cos(angle)*depth);
            
            row = tx / tileSize;
            col = ty / tileSize;

            var rrow = toInt(row);
            var rcol = toInt(col);

            if (map[rrow][rcol] >= 1){
                wallHeight = 12000 / (depth + 0.0001);
                wallWidth *= 2;

                var startY = toInt(height-wallWidth) / 2;
                var endY = toInt(height+wallWidth) / 2;

                stroke(255);
                strokeWeight(toInt(wallWidth));

                line(
                    ray * wallWidth, startY,
                    ray * wallWidth, endY
                );
                break;
            }
        }
        angle -= stepAngle;
    }
}

let time = 0;
let angle2 = 0;

function draw(){
    time += 0.001;
    background(10);

    let x = noise(time)*width;
    let y = noise(time+200)*height;

    stroke(255);

    text("soon...", x, y);

    var icon = document.getElementById("icon");
    icon.style = "transform: rotate("+angle2.toString()+"deg);";
    angle2 += 1;
}