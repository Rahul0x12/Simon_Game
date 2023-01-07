var gameColor  = ["green","red","yellow","blue"];
var colorPattern = [];
var gamePattern = [];

$(document).on("keypress",randomColorGenerator);

function randomColorGenerator(){
    $(document).off("keypress");
    gamePattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    colorPattern.push(gameColor[randomNumber]);
    $("h1").text("Level "+colorPattern.length);
    setTimeout(() =>{
        $("."+gameColor[randomNumber]).fadeIn(100).fadeOut(100).fadeIn(100);
        colorSound(gameColor[randomNumber]);
    },500);
    
    // console.log(colorPattern," - random"); 
}


$(".btn").on("click",function(event){
    var color = event.target.id;
    gamePattern.push(color);
    $("#"+color).addClass("pressed");
    colorSound(color);
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    },100);
    
    checkAnswer(gamePattern.length-1)

});    

function checkAnswer(answer) {
    if(colorPattern[answer] === gamePattern[answer]){
        if(gamePattern.length === colorPattern.length){
            randomColorGenerator();
        }
    }else {
        $("h1").text("Game Over, Press Any Key to Retart");
        colorSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        },100);
        gamePattern = [];
        colorPattern = [];
        $(document).on("keypress",randomColorGenerator);
    }
}


function colorSound(name) {
    var sound = new Audio("sounds/"+name+".mp3");
    sound.play();
}