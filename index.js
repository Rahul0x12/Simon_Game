var gameColor  = ["green","red","yellow","blue"];
var colorPattern = [];
var gamePattern = [];
var color;
var press;

$(".pop-up").on("click",() =>{
    $(".pop-up").css("display","none");
    randomColorGenerator();
});

function randomColorGenerator(){
    gamePattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    // color = gameColor[randomNumber];
    colorPattern.push(gameColor[randomNumber]);
    $("h1").text("Level "+colorPattern.length);

    colorIndicator(gameColor[randomNumber]);

    // setTimeout(()=>{
    //     $("."+gameColor[randomNumber]).addClass(gameColor[randomNumber]+"-pressed");
    //     colorSound(gameColor[randomNumber]);
    //     setTimeout(() =>{
    //         $("."+gameColor[randomNumber]).removeClass(`${gameColor[randomNumber]}-pressed`);
    //     },200);
    // },500);
}

function colorIndicator(colorValue){
    setTimeout(()=>{
        $("."+colorValue).addClass(colorValue+"-pressed");
        colorSound(colorValue);
        setTimeout(() =>{
            $("."+colorValue).removeClass(`${colorValue}-pressed`);
        },200);
    },500);
}



$(".btn").on("click",function(event){
    color = event.target.id;
    press = color+"-pressed pressed"; 
    gamePattern.push(color);
    $("#"+color).addClass(press);
    colorSound(color);
    setTimeout(function(){
        $("#"+color).removeClass(press);
    },100);
    
    checkAnswer(gamePattern.length-1)

});    

function checkAnswer(answer) {
    if(colorPattern[answer] === gamePattern[answer]){
        if(gamePattern.length === colorPattern.length){
            randomColorGenerator();
        }
    }else {
        $(".pop-up").css("display","block");
        $("p").text("Your Memory Level is "+(colorPattern.length - 1));
        $("h2").text("Retry");
        colorSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        },100);
        gamePattern = [];
        colorPattern = [];
    }
}


function colorSound(name) {
    var sound = new Audio("sounds/"+name+".mp3");
    sound.play();
}