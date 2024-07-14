var content = document.getElementById("content");
var images = content.getElementsByTagName("img");

function openImage(src){
    document.getElementById("content").style = "display: none;";
    document.getElementById("imgShow").src = src;
    document.getElementById("show").style.display = "block";
}
function closeImage(){
    document.getElementById("show").style.display = "none";
    document.getElementById("content").style = "display: block;";
}

for(let i = 0; i < images.length; i++){
    let img = images.item(i);
    img.onclick = (ev)=>{openImage(img.src);}
}