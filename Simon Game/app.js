// root variables


const buttonColors = ["red","blue","green","yellow"]; 
let choiceAI = []
let choicePlayer = []

let isGameRunning = false;

let level = 0;


$(document).keypress(function(){
        if (!isGameRunning) {   
            aiTurn();  
            isGameRunning = true; 
    }});

function aiTurn() {
    level++;
    $("h1").text(`Level ${level} `);
    let dice = Math.floor(Math.random() * 4);
    let aiDecision = buttonColors[dice];
    choiceAI.push(aiDecision);
    $("#" + aiDecision).fadeIn(100).fadeOut(100).fadeIn(100);
    playAudio(aiDecision)
}
    




$(".btn").click(function() {
    let playerTarget = $(this).attr("id");
    choicePlayer.push(playerTarget);
    clickAnimation(playerTarget);
    checkAnswer(choicePlayer.length - 1);
    playAudio(playerTarget)
})



function clickAnimation(playerTarget) {
    $("#" + playerTarget).addClass("pressed");
        setTimeout(() => {
            $("#" + playerTarget).removeClass("pressed")
        },100)
}



// // // Progression!!!!!!!!!!!!!!!!!


function checkAnswer(gameLevel) {
    if (choicePlayer[gameLevel] === choiceAI[gameLevel]){
        if (choicePlayer.length === choiceAI.length){
            choicePlayer = []
            setTimeout(function() {aiTurn()},1000)
        }
        
    } else {
        playAudio("wrong")
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
        $("body").removeClass("game-over");
        }, 200);
        reStart();
        
    }
    
}

function reStart () {
    choiceAI = [];
    choicePlayer = [];
    isGameRunning = false;
    level = 0;
    
}

function playAudio(key) {
    let buttonsound= new Audio("sounds/" + key + ".mp3");
    buttonsound.play();
}