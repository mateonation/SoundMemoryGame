let sequence=[];let userseq=[];let userseqiteration;let back;
let level=0;let speed=1;let points=0;
let gamestarted=false; let cancontinue=true;
let buttons=['btn01','btn02','btn03','btn04'];
let seqinterval;let wospeedprogression=false;let cus_speed=false;
let theme='light';

// When user presses the 'START!' button:
function startGame(){
    // set the without speed progression and custom speed values to false
    wospeedprogression=false;cus_speed=false;
    // function does not initialize if user can't continue
    if(!cancontinue){
        return;
    // if not, then check if a game has already been started and ask the user if they want to end it and start a whole new game
    }else if(gamestarted){
        if(!confirm('Are you sure you want to end the current game and start a new one?')){
            return;
        }
    }
    // if it can continue, then initialize function and change the state to false until the function finishes
    cancontinue=false;
    // execute theme manager for themes
    themeManager();
    sequence=[];
    // set the speed of the game in order to the option selected on the dropdown menu
    speed=1;
    let speed_selector=document.getElementById('speed-selector');
    let speed_val=speed_selector.options[speed_selector.selectedIndex].value;
    let sp_index=parseInt(speed_val);
    // if the option selected on the dropdown menu is not 0, then it's either without speed progression or with a custom speed
    if(sp_index!=0){
        wospeedprogression=true;
        // if the option selected is custom speed, then do the next function
        if(sp_index!=1){
            speed=askSpeed();
        }
    }
    // reset game stats to default and display them on each display
    speedDisplay(speed);
    level=0;levelDisplay(level);
    points=0;pointsDisplay(points);
    // set the state of the game to started
    gamestarted=true;
    // sequence executer: when it finishes, user can continue again
    sequenceExecuter(speed);
}

// When user presses a colored button onscreen
function buttonPressed(id){
    // function does not initialize if user can't continue
    if(!cancontinue){
        return;
    // if it's not, then change it to true until the function finishes
    }else{
        cancontinue=false;
    }
    // get the id of said button and it's background color
    let pressedbtn=document.getElementById(id);
    // set the perfect sequence to false
    let perfseq=false;
    // get background color of the button that was pressed
    back=getComputedStyle(pressedbtn).backgroundColor;
    // initialize animation to bright up the button pressed
    let a=0;
    brightButtonAmt(pressedbtn,back,a);
    setTimeout(()=>{
        // remove styles that were added in a timeout
        pressedbtn.removeAttribute('style');
    },100);
    // if a game was started, CHECK IF IT'S VALID ON THE SEQUENCE WIP WIP WIP WIP!!!
    if(gamestarted){
        // if the button coincides, sum up one iteration
        if(verifyButtonOnSequence(pressedbtn)){
            userseq.push(pressedbtn);
            userseqiteration++;
            // this should loop again the sequence executer if the iteration excedes the sequence length
            if(userseqiteration>=sequence.length){
                perfseq=true;
            }
        // If not, set the game started to false and show up an error alert
        }else{
            let i=0;
            sequenceLostGame(i);
            gamestarted=false;
            return;
        }
    }
    if(perfseq && gamestarted){
        // increase level
        level++;
        levelDisplay(level);
        // increase points by 9
        points=points+9;
        pointsDisplay(points);
        // every 3 levels the speed is incremented if the speed is not superior than 5 and if the game has speed progression
        if(level%3===0 && speed<5 && !wospeedprogression){
            speed++;
            speedDisplay(speed);
        }
        // execute the sequence again if the sequence was perfect
        sequenceExecuter(speed);
        cancontinue=false;
    }else if(gamestarted){
        // increase points by 3
        points=points+3;
        pointsDisplay(points);
    }
    setTimeout(()=>{
        // remove styles that were added in a timeout
        cancontinue=true;
    },100);
}

// To bright up a button
function brightButtonAmt(button,back,a){
    let glow='#ffffff';
    // execute button's sound
    let sound=new Audio();
    sound.autoplay=true;
    sound.src='../fx/'+button.id+'.ogg';
    // if the actual theme is 'contrast': change glow colour in which button was pressed
    if(document.getElementById('theme-element').classList.item(0)==='contrast'){
        switch(button.id){
            case 'btn01':
                glow='#ff0000';break;
            case 'btn02':
                glow='#00ff00';break;
            case 'btn03':
                glow='#ffff00';break;
            case 'btn04':
                glow='#0000ff';break;
        }
    }
    // if not, glow remains white;
    setTimeout(()=>{
        button.style.filter='brightness(100%)';
        button.style.background='radial-gradient(closest-side, '+glow+', '+back+')';
    },a);
}

// Function that executes the sequence
function sequenceExecuter(speed){
    // set the user sequence iteration to 0 & reset the whole user sequence
    userseqiteration=0;userseq=[];
    // generate a random number from 0 to the max number of buttons on screen
    let randombtn=Math.floor(Math.random()*buttons.length);
    // push it to the sequence
    let button=document.getElementById(buttons[randombtn]);sequence.push(button);
    // decide at what speed the buttons are going to be shown
    let time;
    switch(speed){
        case 1:
            time=1000;
            break;
        case 2:
            time=800;
            break;
        case 3:
            time=700;
            break;
        case 4:
            time=550;
            break;
        case 5:
            time=450;
            break;
    }
    // execute sequence loop
    let i=0;
    sequenceLoop(time,i);
}

// Execute the sequence loop
function sequenceLoop(time,i){
    setTimeout(()=>{
        // read button number (i) of the sequence
        let button=sequence[i];
        // if the button brighting up it's not the first one, remove the 'brighting up' style from the previous one
        let oldbtn=sequence[i-1];
        if(i!=0){
            oldbtn.removeAttribute('style');
        }
        // get background color of the button that was pressed if the current button of the sequence was not the same as the previous one
        if(oldbtn!=button){
            back=getComputedStyle(button).backgroundColor;
        }
        // bright it up
        a=100;
        brightButtonAmt(button,back,a);
        i=i+1;
        if(i<sequence.length){
            sequenceLoop(time,i);
        }else{
            setTimeout(()=>{
                button.removeAttribute('style');
                // now that the function fully finished, user can continue
                cancontinue=true;
            },time);
        }
    },time);
}

// Check if the button coincides with the button saved on the sequence in the iteration that's specified
function verifyButtonOnSequence(button){
    if(button===sequence[userseqiteration]){
        return true;
    }else{
        return false;
    }
}

// Function to set manually the speed of the game
function askSpeed(){
    let selecting=true;let number;let popup;
    // do this loop until a valid number is selected or until the user changes it's mind and does not set any speed
    do{
        // prompt asking
        popup=prompt('Insert the speed number you would like to play the game at\n\n(1 to 5 included)',"0");
        // if user pressed CANCEL button
        if(popup===null){
            // if user selects ACCEPT in the next confirm, then set the normal speed progression configuration
            if(confirm("Do you still want to choose the speed of the game or do you want it to have automatic progression?\n")){
                document.getElementById('speed-selector').options[0].selected='selected';
                number=1;
                wospeedprogression=false;
                selecting=false;
            }
        // if user pressed ACCEPT button
        }else{
            // parse the prompt result
            number=parseInt(popup);
            // if it's greater than 0 and less or equal to 5 then stop the loop and set the variable custom speed to true
            if(number>0 && number<=5){
                cus_speed=true;
                selecting=false;
            }
        }
    }while(selecting);
    return number;
}

// Set the level number on it's text input
function levelDisplay(level){
    let lvl_display=document.getElementById('level-num');
    lvl_display.value=level;
}

// Set points on it's text input
function pointsDisplay(points){
    let pt_display=document.getElementById('points-num');
    pt_display.value=points;
}

// Set speed value on it's text input
function speedDisplay(speed){
    let sp_display=document.getElementById('speed-num');
    sp_display.value=speed;
}

// Animation that occurs when the user hits the wrong button in a sequence
function sequenceLostGame(i){
    // paint all 4 buttons black
    setTimeout(()=>{
        for(y=0;y<buttons.length;y++){
            let div=document.getElementById(buttons[y]);
            div.style.backgroundColor='#000000';
        }
    },100);
    let time=200;
    // light up buttons in certain time
    setTimeout(()=>{
        for(x=0;x<buttons.length;x++){
            let div=document.getElementById(buttons[x]);
            back='#000000';
            let a=100;
            brightButtonAmt(div,back,a);
        }
    },time);
    // turn off the buttons in that time multiplied by two
    setTimeout(()=>{
        for(x=0;x<buttons.length;x++){
            let div=document.getElementById(buttons[x]);
            div.style.background='#000000';
        }
        i++;
        // loop it again
        if(i<4){
            sequenceLostGame(i);
        // if the buttons have already been lighted up 4 times, break the loop and show pop up with the total stats of the game
        }else{
            setTimeout(()=>{
                showPopup();
            },time)
        }
    },time*2);
}

// Show the popup window with the stats of the game
function showPopup(){
    // write theme name
    let theme_tile=document.getElementById('theme-tile');theme_tile.textContent=theme;
    // write the actual speed value
    let speed_tile=document.getElementById('speed-tile');speed_tile.textContent=speed;
    // write if there's speed progression
    let progression_tile=document.getElementById('progression-tile');progression_tile.textContent=!wospeedprogression;
    // write if a custom speed has been set
    let custom_tile=document.getElementById('custom-tile');custom_tile.textContent=cus_speed;
    // write the number of the levels that the user has cleared
    let level_tile=document.getElementById('level-tile');level_tile.textContent=level;
    // write the number of the points that the user has achieved
    let pointstext=document.getElementById('totalpoints');pointstext.textContent='Total points: '+points;
    // hide buttons (they keep appearing on top of the pop up for some reason)
    for(i=0;i<buttons.length;i++){
        let btn=document.getElementById(buttons[i]);
        btn.style.display='none';
    }
    // finally, show pop up window
    let popup_zone=document.getElementById('popup-overlay');popup_zone.style.display='block';
    // add an event listener to the close button
    document.getElementById('closing').addEventListener('click', ()=>{
        // hide popup again
        popup_zone.removeAttribute('style');
        // remove all style atributes of the buttons (make them visible again)
        for(i=0;i<buttons.length;i++){
            let btn=document.getElementById(buttons[i]);
            btn.removeAttribute('style');
        }
        // let the user continue again
        cancontinue=true;
    });
}

// Set the theme of the game
function themeManager(){
    // array of themes' names
    const themes=['light','dark','contrast','clear-sky','warm-sunset','sweet-melon','red-apple','canary-banana','spooky-pumpkin','juicy-peach','frozen-lake'];
    // read current theme of the game
    let body=document.getElementById('theme-element');
    let current=body.classList.item(0);
    // read what theme is selected on the theme-selector
    let selector=document.getElementById('theme-selector');
    let index=selector.options[selector.selectedIndex].value;
    // select theme by using the selector value as an index to the theme name list
    let selected=themes[index];
    // change theme of the game if the current theme and the one selected are not the same
    if(current!=selected){
        body.classList.remove(current);
        body.classList.add(selected);
        theme=selected;
    }
}