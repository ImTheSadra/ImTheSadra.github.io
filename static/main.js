let xhr = new XMLHttpRequest();
xhr.open('GET', '/status.txt');
xhr.onload = () => {
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

// if (innerWidth > innerHeight){
//     grid.classList.add("grid-cols-2");
//     projects.classList.add("grid-cols-3");
// } else {
//     grid.classList.add("grid-cols-1");
//     grid.classList.add("grid-cols-1");
// }

function addRepo(name, imgURL, desc) {
    // Card container with fixed max width
    const card = document.createElement("div");
    card.className = "w-full max-w-md bg-slate-800 border border-slate-700 rounded-lg shadow-lg overflow-hidden transition hover:scale-[1.02] duration-300";

    // Image
    const img = document.createElement("img");
    img.src = imgURL;
    img.alt = name;
    img.className = "w-full h-48 object-cover";
    card.appendChild(img);

    // Content area
    const content = document.createElement("div");
    content.className = "p-4 space-y-2";

    // Title with link
    const title = document.createElement("h3");
    title.className = "text-xl font-semibold text-blue-400 hover:underline";

    const link = document.createElement("a");
    link.href = `https://github.com/imthesadra/${name}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.innerText = name;

    title.appendChild(link);

    // Description
    const description = document.createElement("p");
    description.className = "text-sm text-gray-300";
    description.innerText = desc;

    // Assemble
    content.appendChild(title);
    content.appendChild(description);
    card.appendChild(content);

    // Append to grid container
    document.getElementById("projects").appendChild(card);
}




let rxhr = new XMLHttpRequest();
rxhr.open('GET', '/projects.txt');
rxhr.onload = () => {
    let repos = rxhr.response.split('\n');
    console.log(repos);
    for (let i = 0; i < repos.length; i++) {
        let splited = repos[i].split(',');
        let req = new XMLHttpRequest();
        req.open('GET', 'https://api.github.com/repos/imthesadra/' + splited[0]);
        let error = false;
        req.onload = () => {
            if (req.status == 403) { error = true; }
            let res = JSON.parse(req.response);
            let d = res['description'];
            if (d == "undefined") { d = ""; }
            addRepo(splited[0], splited[1], d);
            console.log(res);
        }
        req.send();
    }
    if (error) {
        alert("you have rate limited in github api so you cant see my projects well");
    }
}
rxhr.send()

function showImages() {
    let grid = document.getElementById("images");
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/images.txt');
    xhr.onload = () => {
        let images = xhr.response.split('\n');
        // grid.classList.add("grid-cols-"+images.length.toString());
        for (let b64 of images) {
            let img = new Image(100);
            img.src = b64;
            grid.appendChild(img);
        }
    }
    xhr.send();
}

if (document.getElementById("menu_items").children.length == 0) {
    document.getElementById("nav-toggle").classList.add("hidden");
}