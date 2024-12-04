let sequence=[];
let level=0;let lvl_display=document.getElementById('level-num');
let speed=1;let sp_display=document.getElementById('speed-num');
let points=0;let pt_display=document.getElementById('points-num');
let gamestarted=false;

// When user presses the 'START!' button:
function startGame(){
    // reset game stats to default and display them on each display
    sequence=[];
    level=0;lvl_display.value=level;
    points=0;sp_display.value=speed;
    speed=1;pt_display.value=points;
    // set the state of the game to started
    gamestarted=true;
}

function buttonPressed(id){
    let pressedbtn=document.getElementById(id);
    let btncolor=getComputedStyle(pressedbtn).backgroundColor;
    if(gamestarted){
        
    }else{
        
    }
    pressedbtn.style.filter='brightness(100%)';
    pressedbtn.style.background='radial-gradient(closest-side, #ffffff, '+btncolor+')';
}