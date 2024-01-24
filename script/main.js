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
    title.innerText = "Game";
    
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

var angle = 0;

function loop(){
    var icon = document.getElementById("icon");
    icon.style = "transform: rotate("+angle.toString()+"deg);";

    angle += 1;
    setTimeout(loop, 10);
}

loop()