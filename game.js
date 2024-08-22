//VARIABLES CREATED
var userClickedPattern = [];
var gamePattern = []
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStart = false;
var level = 0;
var highestLevel = 0;
var currentLevel = 0;

/*STEP 6
create a new function called nextSequence()
*/

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    /*STEP 8
    use jQuery to select the button with the same id as the randomChosenColour
    */
   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

   playSound(randomChosenColour);

}

/*STEP 10
use jQuery to detect when any button are clicked and trigger a handler function.
*/

$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
    
})




/**STEP 12
 * Create a new fucntion called playSound() that takes a single input parameter called name
 * 
 */

function playSound(name){
    var playAudio = new Audio("./sounds/" + name + ".mp3");
    playAudio.play();

}


/**STEP 13
 * Create a new function called animatePress(), it should take a single input parameter called currentColour.
 * 
*/

function animatePress(currentColour){

    $( "#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}

/**STEP 16
 * Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
 * 
*/

$(document).keypress(function(){

    if(!gameStart){
        
    nextSequence();
    gameStart = true;

    }

})

$(".button").click(function(){

    if (!gameStart) {
        $(".button").addClass("button-click")

    setTimeout(function(){
        $(".button").removeClass("button-click")
    }, 100);

    nextSequence();
    gameStart = true;
    }
})

/**STEP 18
 * Create a new function called checkAnswer(), it should take a single input with the name currentLevel
 * 
*/

function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){

        if (equalArray(userClickedPattern, gamePattern)){

            setTimeout(function(){
                nextSequence();
            }, 1000)

            currentLevel++;
            $(".curent-level-reached").text("Current Level Reached: " + currentLevel);


        }

    }else {

        if (level > highestLevel){

            highestLevel = level;
        
        }

        $(".highest-level-reached").text("Highest Level Reached: " + highestLevel)

        $("h1").text("Game Over, Click Any key to Restart")
        $(".button").text("Click to Restart")
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 2000)

        startOver();
    }
}


//FUNCTION THAT CHECK IF AN 2 ARRAY ARE EQUAL

function equalArray(firstArray, secondArray){

    return JSON.stringify(firstArray) === JSON.stringify(secondArray);

}

/**STEP 22 
 * Create a function called startOver()
*/

function startOver(){

    level = 0;
    gamePattern = [];
    gameStart = false;
    currentLevel = 0
    $(".curent-level-reached").text("Current Level Reached: " + currentLevel);

}


