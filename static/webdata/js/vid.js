playbtn = document.getElementById("play");
mutebtn = document.getElementById("mute");
fullbtn = document.getElementById("full");
seek = document.getElementById("seek");
volume = document.getElementById("volume");
playbtn.addEventListener("click",sentdata,false);
mutebtn.addEventListener("click",sentdata,false);
fullbtn.addEventListener("click",sentdata,false);
seek.addEventListener("change",seek_move,false);
volume.addEventListener("click",sentdata,false);

function sentdata(){
    update();  
}
function seek_move(){
    
}

function update(){
    fetch("update",{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({want:"all"})
    })
    .then(res => res.json())
    .then(data =>{
        seek.value = data.time;
        volume.value = data.volume;
        if (data.pause == "True"){
            playbtn.style.backgroundImage = "url(/static/webdata/images/pause.png)";
        }else{
            playbtn.style.backgroundImage = "url(/static/webdata/images/play.png)";
        }
        if (data.mute == "True"){
            mutebtn.style.backgroundImage = "url(/static/webdata/images/unmute.png)";
        }else{
            mutebtn.style.backgroundImage = "url(/static/webdata/images/mute.png)"
        }
        if (data.full == "True"){
            fullbtn.style.backgroundImage = "url(/static/webdata/images/fullscreen.png)"
        }else{
            //add the other pic here
        }
    }) 
}