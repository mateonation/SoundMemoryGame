let sequence=[];let userseq=[];
let level=0;let lvl_display=document.getElementById('level-num');
let speed=1;let sp_display=document.getElementById('speed-num');
let points=0;let pt_display=document.getElementById('points-num');
let gamestarted=false; let cancontinue=true;
let buttons=['btn01','btn02','btn03','btn04'];
let seqinterval;

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
    sequence=[];userseq=[];
    level=0;lvl_display.value=level;
    points=0;sp_display.value=speed;
    speed=1;pt_display.value=points;
    // set the state of the game to started
    gamestarted=true;
    // sequence executer: when it finishes, player can continue again
    sequenceExecuter(speed);
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
    // if a game was started, CHECK IF IT'S VALID ON THE SEQUENCE WIP WIP WIP WIP!!!
    if(gamestarted){
        
    }
    // initialize animation to bright up the button pressed
    brightButtonAmt(pressedbtn);
    // remove styles that were added in a timeout
    setTimeout(()=>{
        pressedbtn.removeAttribute('style');
        // now that the function fully finished, player can continue
        cancontinue=true;
    },100);
}

// To bright up a button
function brightButtonAmt(button){
    // get background color of the button that was pressed
    let back=getComputedStyle(button).backgroundColor;
    button.style.filter='brightness(100%)';
    button.style.background='radial-gradient(closest-side, #ffffff, '+back+')';
}

// Function that executes the sequence
function sequenceExecuter(speed){
    // generate a random number between 1 and the number of buttons on screen
    let randombtn=Math.floor(Math.random()*buttons.length);
    // push it to the sequence
    let button=document.getElementById(buttons[randombtn]);
    sequence.push(button);
    // decide at what speed the buttons are going to be shown
    let time;
    switch(speed){
        case 1:
            time=1000;
            break;
        case 2:
            time=900;
            break;
        case 3:
            time=800;
            break;
    }
    // show sequence
    for(i=0;i<sequence.length;i++){
        let btn=sequence[i];
        seqinterval=setInterval(brightButtonAmt(btn),time);
        setTimeout(()=>{
            btn.removeAttribute('style');
        },(time-100));
    }
    // now that the function fully finished, player can continue
    cancontinue=true;
}