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
                write("cat ./profile.txt", 
                    ()=>{
                        var result = document.getElementById("result");
                        result.style = "display: block;";

                        var bash = document.getElementById("bash-promp2-view").style = "display: block";
                    }, "bash-promp"); 
            }, 100);
        }, "bash-promp2"
    );
}, "bash-promp");