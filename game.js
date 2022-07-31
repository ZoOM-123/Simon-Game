
var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];

var randomNumber;
var randomChosenColor;

function playSound(name){
    var soundPath="sounds/"+name+".mp3";
    
    new Audio(soundPath).play();
}

function animatePress(name){
    // $("#"+name).fadeOut(100).fadeIn(100);
    $("#"+name).addClass("pressed");
    setTimeout(function(){
        $("#"+name).removeClass("pressed");
    },100);
}

function nextSequence(){
    
    if(press_started==1){
        return ;
        
    }
    
    $("h1").text("level "+level);
    level++;
    randomNumber=Math.floor(Math.random()*4);

    randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    animatePress(randomChosenColor);


    playSound(randomChosenColor);
    // level++;
    press_started=1;
}

function handler(){

    animatePress(this.id);
    playSound(this.id);
    

    var userChosenColor=this.id;
    userClickedPattern.push(userChosenColor);
    var res=check();
    if(res==false){
        // game is over
        press_started=0;
        level=0;
        gamePattern=[];
        userClickedPattern=[];
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        console.log("game over");
    }
    else{
        if(userClickedPattern.length==gamePattern.length){
            userClickedPattern=[];
            press_started=0;
            setTimeout(nextSequence,1000);
            // nextSequence();
            
            // then we will be preciding to the next level
        }
    }

}

function check(){
    var size=userClickedPattern.length;
    if(userClickedPattern[size-1]!=gamePattern[size-1]){
        return false;
    }
    return true;
}

$(".btn").click(handler);


// starting the game
var press_started=0;
// if(started==0){
$(document).keydown(nextSequence);
// }


var level=0;


