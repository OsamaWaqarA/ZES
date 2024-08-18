var r = 125,g = 255, b =212, rn = false, gn = false, bn = false;
status_head = document.getElementById("status_head");
status_head2 = document.getElementById("status_head2");

setInterval(headColour,25);

function headColour(){
    status_head.style.color = `rgb(${r}, ${g}, ${b})`;
    status_head2.style.color = `rgb(${g}, ${b}, ${r})`;

    if (r >= 255){
        rn = true;
    }else if ( r <= 0){
        rn = false
    }
    if (g >= 255){
        gn = true;
    }else if (g <= 0){
        gn = false;
    }
    if (b >= 255){
        bn = true;
    }else if (b <= 0){
        bn = false;
    }

    if (rn == true){
        r = r -1;
    }else{
        r = r + 1;
    }
    if (gn == true){
        g = g - 1;
    }else{
        g = g + 1;
    }
    if (bn == true){
        b = b - 1;
    }else{
        b = b + 1;
    }
}