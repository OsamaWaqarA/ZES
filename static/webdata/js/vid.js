var pause = "False", mute = "Fasle", full = "True", seek_mess = "un", cip = "",watching = "",strike = 0,newip = 0;
playbtn = document.getElementById("play");
mutebtn = document.getElementById("mute");
fullbtn = document.getElementById("full");
seek = document.getElementById("seek");
volume = document.getElementById("volume");

Status = document.getElementById("status");
Status2 = document.getElementById("status2");
theip = document.getElementById("IP");


playbtn.addEventListener("click",playpause,false);
mutebtn.addEventListener("click",muteornomute,false);
fullbtn.addEventListener("click",fullornofull,false);
seek.addEventListener("change",seek_move,false);
volume.addEventListener("change",sentdata,false);
setInterval(real,5000);

function inputIP(){
    console.log(strike);
    if (strike >= 1){
        Status.style.visibility = "hidden";
        Status2.style.visibility = "visible";
        if (theip.value >= 100){
            newip = theip.value;
        }else{
            newip = 0;
        }
    }else{
        Status2.style.visibility = "hidden";
        Status.style.visibility = "visible";
        theip.value = 0;
    }
}

function playpause(){
    if (pause == "True"){
        pause = "False";
        playbtn.style.backgroundImage = "url(/static/webdata/images/pause.png)";
    }else{
        playbtn.style.backgroundImage = "url(/static/webdata/images/play.png)";
        pause = "True";
    }
    sentdata();
}

function real(){
    fetch("check",{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({cip:cip,
            watching:watching,
            newip:newip
        })
    })
    .then(res => res.json())
    .then(data =>{
       if (data.status != "success"){
        real();
       }else{
        cip = data.cip;
        watching = data.watching;
        if (cip != ""){
            strike = 0;
        }else{
            strike = strike +1;
        }
        inputIP();
       }
    }) 
}

function muteornomute(){
    if (mute == "False"){
        mute = "True";muteornomute
        mutebtn.style.backgroundImage = "url(/static/webdata/images/unmute.png)";
    }else{
        mute = "False";
        mutebtn.style.backgroundImage = "url(/static/webdata/images/mute.png)";
    }
    sentdata();
}

function fullornofull(){
    if (full == "True"){
        full = "Flase";
        // add other pic here
    }else{
        fullbtn.style.backgroundImage = "url(/static/webdata/images/fullscreen.png)"
        full = "True";
    }
    sentdata();
}

function sentdata(){
    command();  
}
function seek_move(){
    seek_mess = seek.value;
    sentdata();
    seek_mess = "un";
}

function command(){
    fetch("command",{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({volume: volume.value,
            pause : pause,
            mute : mute,
            full : full,
            seek :seek_mess
        })
    })
    .then(res => res.json())
    .then(data =>{
       if (data.status != "success"){
        command();
       }
    }) 
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
        if (data.status != "success"){
            update();
        }else{

            if (data.time != "uc"){
                seek.value = data.time;
            }
            volume.value = data.volume;
            pause = data.pause;
            mute = data.mute;
            full = data.full;
            if (data.pause == "True"){
                playbtn.style.backgroundImage = "url(/static/webdata/images/play.png)";
            }else{
                playbtn.style.backgroundImage = "url(/static/webdata/images/pause.png)";
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
        }
    }) 
}