let xhr = new XMLHttpRequest();
xhr.open('GET', '/status.txt');
xhr.onload = ()=>{
    const items = xhr.response.split('\n');

    new Typed('#typed-output', {
        strings: items,
        typeSpeed: 60,
        backSpeed: 25,
        backDelay: 1000,
        startDelay: 100,
        loop: true,
        showCursor: false
    });
}
xhr.send();

let grid = document.getElementById("grid");
let projects = document.getElementById("projects");

if (innerWidth > innerHeight){
    grid.classList.add("grid-cols-2");
    projects.classList.add("grid-cols-3");
} else {
    grid.classList.add("grid-cols-1");
    grid.classList.add("grid-cols-1");
}

function addRepo(name, imgURL, desc){
    let a = document.createElement("a");
    a.href = "https://github.com/imthesadra/"+name;
    a.className = "p-4 w-full h-full";

    let div = document.createElement("div");
    div.className = "max-w-sm w-full h-full rounded-md overflow-hidden shadow-lg dark:bg-slate-950 bg-slate-100 p-3";
    
    let img = document.createElement("img");
    img.src = imgURL;
    img.className = "w-full rounded-md";
    img.alt = "Project";

    let about = document.createElement("div");
    about.className = "px-6 py-4";

    let info = document.createElement("div");
    info.className = "text-gray-700 text-base";
    info.innerText = desc;

    let title = document.createElement("p");
    title.innerText = name;
    title.className = "font-bold text-xl mb-2";
    
    about.appendChild(title);
    about.appendChild(info);

    div.appendChild(img);
    div.appendChild(about);

    a.appendChild(div);

    let projects = document.getElementById("projects");
    projects.appendChild(a);
}

let rxhr = new XMLHttpRequest();
rxhr.open('GET', '/projects.txt');
rxhr.onload = ()=>{
    let repos = rxhr.response.split('\n');
    console.log(repos);
    for(let i = 0; i < repos.length; i++){
        let splited = repos[i].split(',');
        let req = new XMLHttpRequest();
        req.open('GET', 'https://api.github.com/repos/imthesadra/'+splited[0]);
        let error = false;
        req.onload = ()=>{
            if (req.status == 403){error = true;}
            let res = JSON.parse(req.response);
            let d = res['description'];
            if (d == "undefined"){d = "";}
            addRepo(splited[0], splited[1], d);
            console.log(res);
        }
        req.send();
    }
    if (error){
        alert("you have rate limited in github api so you cant see my projects well");
    }
}
rxhr.send()

function showImages(){
    let grid = document.getElementById("images");
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/images.txt');
    xhr.onload = ()=>{
        let images = xhr.response.split('\n');
        // grid.classList.add("grid-cols-"+images.length.toString());
        for(let b64 of images){
            let img = new Image(100);
            img.src = b64;
            grid.appendChild(img);
        }
    }
    xhr.send();
}

if (document.getElementById("menu_items").children.length == 0){
    document.getElementById("nav-toggle").classList.add("hidden");
}