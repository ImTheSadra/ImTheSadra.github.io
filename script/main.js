function clearBash(){
    var bash = document.getElementById("bash-promp");
    bash.innerHTML = "";
    bash.innerText = "";
    var bash = document.getElementById("bash-promp2");
    bash.innerHTML = "";
    bash.innerText = "";

    var bash = document.getElementById("bash-promp2-view");
    bash.style = "display: none;";

    var result = document.getElementById("result");
    result.style = "display: none";
}

function write(text, func, id){
    var index = 0
    function writer(){
        var input = document.getElementById(id);
        input.innerHTML += text.charAt(index);

        index += 1;

        if (text.length <= index){
            setTimeout(func, 100);
            return;
        }
        setTimeout(writer, 100);
    }
    writer()
}

write("./main.bin", ()=>{
    document.getElementById("bash-promp2-view").style = "";

    var main = document.getElementsByTagName("main").item(0);
    main.style = "display: block";

    var title = document.createElement("h3");
    title.className = "title";
    title.innerHTML = "Game <i class='fa-solid fa-gamepad'></i>";
    
    var childs = main.children;

    var canvas = childs.item(0);
    main.children = [];
    main.appendChild(title);
    main.appendChild(canvas);

    write(
        "clear",
        ()=>{
            setTimeout(() => {
                clearBash();
                write("cat ./profile.txt | lolcat", 
                    ()=>{
                        var result = document.getElementById("result");
                        result.style = "display: block;";

                        var bash = document.getElementById("bash-promp2-view").style = "display: block";
                    }, "bash-promp"); 
            }, 100);
        }, "bash-promp2"
    );
}, "bash-promp");

function goPage(name){
    var pages = document.getElementsByClassName("page");
    for(let i = 0; i < pages.length; i++){
        var p = pages.item(i);
        p.style = "display: none";

        var btn = document.getElementById(p.id + "Btn");
        btn.className = "nav-link";
    }

    var page = document.getElementById(name);
    page.style = "display: block;";

    var pBtn = document.getElementById(name + "Btn");
    pBtn.className = "nav-link active";
}

let page = window.location.hash.replace("#", "");
goPage(page);

var angle = 0;

let parts = document.getElementsByClassName("part");

if (innerWidth < 1000){
    for (let i = 0; i < parts.length; i++){
        let part = parts.item(i);
        part.style.float = "unset";
    }
    document.getElementById("space").innerHTML = "<br><br><br><br><br>";
    document.getElementById("icon").setAttribute("width", "220%");
    let footer = document.getElementById("resumeFooter");
    footer.setAttribute("style", "min-height: 20vh; border-radius: 15px; margin-bottom:1px;");
    let pdf = document.getElementById("pdfShow");
    if (pdf.style.overflow == "hidden"){
        pdf.remove();
        document.getElementById("demo").innerText = "sorry i cant show you pdf files\nyou can download file or use another browser";
    } 
}

function loop(){
    var icon = document.getElementById("icon");
    icon.style = "transform: rotate("+angle.toString()+"deg);";

    angle += 0.5;
    setTimeout(loop, 10);
}

loop();

function gitsearch(){
    let search = document.getElementById("search");
    let url = "https://github.com/search?q=owner%3ASadraInTheBox%20"+search.value;
    window.open(url, "_blank");
}

document.getElementById("certificates").addEventListener("change", ()=>{
    let pdf = document.getElementById("pdfShow");
    let url = "/assest/"+document.getElementById("certificates").value.toString()+".pdf";
    
    document.getElementById("downloadFile").href = url;
    pdf.src = url;
})