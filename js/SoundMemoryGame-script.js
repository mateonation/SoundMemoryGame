let sequence=[];
let level=0;let lvl_display=document.getElementById('level-num');
let speed=1;let sp_display=document.getElementById('speed-num');
let points=0;let pt_display=document.getElementById('points-num');
let gamestarted=false; let cancontinue=true;

// When user presses the 'START!' button:
function startGame(){
    // function does not initialize if player can't continue
    if(!cancontinue){
        return;
    // if it can continue, then initialize function and change the state to false until the function finishes
    }else{
        cancontinue=false;
    }
    // reset game stats to default and display them on each display
    sequence=[];
    level=0;lvl_display.value=level;
    points=0;sp_display.value=speed;
    speed=1;pt_display.value=points;
    // set the state of the game to started
    gamestarted=true;
    // now that the function finished, player can continue
    cancontinue=true;
}

// When user presses a colored button onscreen
function buttonPressed(id){
    // function does not initialize if player can't continue
    if(!cancontinue){
        return;
    // if it's not, then change it to true until the function finishes
    }else{
        cancontinue=false;
    }
    // get the id of said button and it's background color
    let pressedbtn=document.getElementById(id);
    let btncolor=getComputedStyle(pressedbtn).backgroundColor;
    // if a game was started, CHECK IF IT'S VALID ON THE SEQUENCE WIP WIP WIP WIP!!!
    if(gamestarted){
        
    }
    // initialize animation to bright up the button pressed
    brightButtonAmt(pressedbtn,btncolor);
    // remove styles that were added in a timeout
    setTimeout(()=>{
        pressedbtn.removeAttribute('style');
        // now that the function fully finished, player can continue
        cancontinue=true;
    },100);
}

// To bright up a button
function brightButtonAmt(button,color){
    button.style.filter='brightness(100%)';
    button.style.background='radial-gradient(closest-side, #ffffff, '+color+')';
}