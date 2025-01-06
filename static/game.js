const circleDetails = 100;

class Drop{
    constructor(x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color(
            Math.random()*255,
            Math.random()*255,
            Math.random()*255
        );

        this.center = createVector(x, y);

        this.points = [];
        for (let i = 0; i < circleDetails; i++){
            let angle = map(i, 0, circleDetails, 0, TWO_PI);
            let vec = createVector(cos(angle), sin(angle));
            vec.mult(r);
            vec.add(this.x, this.y)
            this.points.push(vec);
        }
    }

    draw(){
        fill(this.color);
        noStroke();
        beginShape();
        for(let vec of this.points){
            vertex(vec.x, vec.y);
        }
        endShape(CLOSE);
    }

    marble(other){
        for(let point of this.points){
            let c = other.center;
            let p = point.copy();
            let r = other.r;

            p.sub(c);

            let root = Math.sqrt(1 + (r**2)/(p.mag()**2));
            p.mult(root);
            p.add(c);
            point.set(p)
        }
    }
    
    tine(x, z, c){
        let u = 1/pow(2, 1/c);
        for (let point of this.points){
            point.x = point.x;
            point.y = point.y + z * pow(u, Math.abs(point.x - x));
        }
    }
}

let drops = [];

function setup(){
    // let canvas = document.getElementById("game_canvas");
    let rainbow = document.getElementById("rainbow_canvas");
    createCanvas(rainbow.clientWidth, rainbow.clientHeight);

    rainbow.setAttribute("width", rainbow.getAttribute("width"));
    rainbow.setAttribute("height", rainbow.getAttribute("height"));

    let canvas = document.getElementById("defaultCanvas0");
    let window = document.getElementById("game_window");
    canvas.classList.add("rounded-b-md");
    canvas.classList.add("w-full");
    canvas.classList.add("h-9/10");
    canvas.removeAttribute("style");
    window.appendChild(canvas);

    canvas.addEventListener("click", (ev)=>{
        let r = document.getElementById("rSize");
        let drop = new Drop(mouseX, mouseY, Number(r.value));
        for(other of drops){
            other.marble(drop);
        }
        drops.push(drop);
    });

    let clearBtn = document.getElementById("clear");
    clearBtn.onclick = ()=>{drops = [];}
}

function draw(){
    background(51);

    for (let drop of drops){
        drop.draw();
    }
}