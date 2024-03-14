const search = new URLSearchParams(window.location.search);

let imgURL = "https://avatars.githubusercontent.com/u/104717267";
let linksContent = "";
let textContent = "با عرض پوزش نمیتونم این پست رو پیدا کنم";

function get(thing, func){
    let req = new XMLHttpRequest();
    req.open("GET", "/blogs/"+search.get("id")+"/"+thing);
    req.onreadystatechange = (e)=> {
        if (req.status == 200){
            let text = req.responseText;
            // text = text.replace("\n", "\n\r");
            func(text);
        } else {
            func(null);
        }
    }
    req.send();
}

function config(){
    if (search.get("id") == null){
        links.innerHTML = linksContent;
        content.value = textContent;
        img.src = imgURL;
        return;
    }
    let links = document.getElementById("links");
    
    get("links.txt", (text)=>{
        if (text != null){links.innerHTML = text;}
        else {links.innerHTML = linksContent;}
    });

    let img = document.getElementById("image");
    let content = document.getElementById("content");
    console.log(content);
    get("text.txt", (text)=>{
        if (text != null){
            content.value = text;
            img.src = "/blogs/"+search.get("id")+"/img.png";
        }
        else {
            content.value = textContent;
            img.src = imgURL;
        }
    });
}

setTimeout(config, 200);