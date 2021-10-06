var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var level = 0;
var started = false;

function nextSequence() {
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    userClickedPattern = [];
}

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    if (gamePattern.length == userClickedPattern.length) { checkPattern(gamePattern, userClickedPattern) };
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed").delay(200).queue(function (next) {
        $(this).removeClass("pressed");
        next();
    })

}

$("body").keypress(function (e) {
    if(!started){
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
    }
});

function checkPattern(gameArray, userArray) {
    gameArray = gameArray.toString();
    userArray = userArray.toString();
    if (gameArray == userArray) {
        setTimeout(function () {
            nextSequence()
        }, 1200);
    }
    else {
        $("body").addClass("game-over").delay(200).queue(function (next) {
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
            $(this).removeClass("game-over");
            next();
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
        }
        )}
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}