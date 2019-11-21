const colourArray = {0:"red", 1:"blue", 2:"yellow", 3:"green"}
const baseNum = 3;

//current level
var currentLevel = 1;
//array containing the computer generated/randomized game pattern
var pattern = [];
//UserInput in an array
var userPattern = [];
//game started is set to false initially
var started = false;
//winCounter
var wins = 0;

//Create computer generated pattern
function createPattern (num) {  
    
    //only generate 3 divs on level 1
    num = parseInt(num) + baseNum - 1;
    //empty pattern or computr generated pattern
    pattern = [];
    
    //clear div
    $('#simon').empty();

    for(let i = 0; i < parseInt(num); i++) {
    //generate random colors
        let colour = colourArray[Math.floor(Math.random() * 4)];
        //push colr to array
        pattern.push(colour);
        //append to 3 divs
        $('#simon').append(`<div class="pattern" id=simonColour${i} style="background-color: ${colour}"> </div>`);
    }
    $('#simon').css('visibility', 'visible');
     hidePattern();
}

// Creates the pattern to be followed.
// param:  level is the current level that the player is on.
function createLevel (level) {
    $('#simon').css('visibility', 'visible');
    $('#simon').show();
    createPattern(level);
   
    //show level
    $("#level-title").text(("Level " + currentLevel));
     

    //board buttons clicked(RGBY)
    console.log("waiting for clck");
    userPattern = [];
    
    $(".btn").unbind().click(function () {
        
       //store the user clicked attribute 
        var userClicked = $(this).attr("id"); 
        // console.log(userClicked);
        //Push the user click info inside the userPattern array 
        userPattern.push(userClicked);         
        $(".help").text("You have entered: " + userPattern);
        
        //Substract one index from the length of userInput each time user clicks a button or makes a choice
        checkAnswer(userPattern.length-1);
    })       


}
 //start game
 
//compare between user and game patterns
function checkAnswer(level) {
    //chck if pattern is equal to user pattern 
    if(pattern[level]==userPattern[level]){
        console.log("Ok");
        //When userpattern is equal to user increment level
        if(userPattern.length==pattern.length){ 
            currentLevel++;
            $("#won").text("You Won");
            wins++;
            $("#reset").click(function () {
                //alert("Reset OK?");
                $("#won").text('');
                $(".help").text(" ");
               startAgain();
            })
            //Re-start the game                       
        }
    }else{
        //if patterns donot match print wrong answer
        console.log("Wrong");
        $("#lose").text("Sorry. You Lose");
        //$("body").addClass("game-over");
        //$(".btn").attr("disabled", "disabled");
        $("#reset").click(function () {
            //alert("Jello");
            $("#lose").text('');
            $(".help").text(" ");
           startAgain();
        })
    }
 }

 //function start the game again
 function startAgain(){
    userPattern = [];
    pattern = [];
    createLevel(currentLevel);
    
}

function hidePattern() {
$("#simon").delay(3000).hide(500);
$('#simon')
    .delay(3000)
    .queue(function (next) {
        $(this).css('visibility', 'hidden');
        next();
    });
}