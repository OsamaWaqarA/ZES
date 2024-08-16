playbtn = document.getElementById("play");
mutebtn = document.getElementById("mute");
fullbtn = document.getElementById("full");
playbtn.addEventListener("click",playpause,false);
mutebtn.addEventListener("click",muteunmute,false);
fullbtn.addEventListener("click",fullnofull,false);

function playpause(){
    playbtn.style.backgroundImage = "url(/static/webdata/images/pause.png)";
}
function muteunmute(){

}
function fullnofull(){
    
}