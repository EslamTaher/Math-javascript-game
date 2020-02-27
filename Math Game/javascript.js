var playing = false;
var score;
var action;
var timeremaning;
var correctAnswer;

//if we click on start / reset button
document.getElementById("startreset").onclick =
function(){
    //if we are playing 
    if(playing == true){
        //resload page
        location.reload();
    }else{  //if we are not playing 
        //set score to zero
        //change mode to playing
        playing =true;
        score = 0; 
        document.getElementById("scorevalue").innerHTML=score;
        //show countdown box
        show("timeremaing");
        timeremaning = 60;
        document.getElementById("timeremaingvalue").innerHTML=timeremaning;
        hide("gameover");
        
        //change button to reset
        document.getElementById("startreset").innerHTML ="Reset game";
        //reduce the time 1 sec in loops
        startCountDown();
        //generate a new question and answer

        generateQA();

    }
}
//function 

//start counter
function startCountDown(){
    action =setInterval(() => {
        timeremaning -=1;
        document.getElementById("timeremaingvalue").innerHTML=timeremaning;
        
        if(timeremaning == 0 ){ //game over 
            stopCountdown();
            show("gameover");
            playing=false; 
            document.getElementById("startreset").innerHTML = "Start Game";
            document.getElementById("gameover").innerHTML="<p>Game over</p><p>Your score is "+ score +" </p>";
            hide("timeremaning");    
            hide("correct");
            hide("wrong"); 
            
        }
        if(score == 20){
            stopCountdown();
            show("gameover");
            playing=false; 
            document.getElementById("startreset").innerHTML = "Start Game";
            document.getElementById("gameover").innerHTML="<p>Well done</p><p>Your score is "+ score +" </p>";
            hide("timeremaning");    
            hide("correct");
            hide("wrong"); 
        }

    }, 1000);
    //stop counter
}function stopCountdown(){
    clearInterval(action);
}
//hide an element
function hide(id){
    document.getElementById(id).style.display="none";
}
//show an element
function show(id){
    document.getElementById(id).style.display="block";
}
//generate new question and answer
function generateQA(){
    var x =1 + Math.round(9 * Math.random());
    var y =1 + Math.round(9 * Math.random());
    correctAnswer = x * y ;
    document.getElementById("question").innerHTML = x + "X" + y ;
    var correctPosition = 1 + Math.round(3 * Math.random());
    //fill one box with the correct answer
    document.getElementById("box"+correctPosition).innerHTML=correctAnswer;
    //fill other boxes with wrong answer
    var answers = [correctAnswer];
    for(i=1;i<5;i++){
        if(i != correctPosition){
            var wrongAnswer;
            do{
                wrongAnswer =(1 + Math.round(9 * Math.random()) * 1 + Math.round(9 * Math.random())); // wrong answer
            }
            while(answers.indexOf(wrongAnswer)>-1);
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}

//timeLeft? continue : gameover


//if we click on answer box check the answer
    //if the answer yes
        //if yes increse score
        //show the correct box for 1 sec
        //and generate the new question
    //if the answer no 
        //show try agin for 1 sec
for(i=1;i<5;i++){
    document.getElementById("box"+i).onclick = function(){
        //check if we are playing
        if(playing == true){
            if(this.innerHTML == correctAnswer){ // yes
                //increase score by one
                score ++;
                document.getElementById("scorevalue").innerHTML = score;
                //hide wrong box and show correct box
                hide("wrong");
                show("correct");
                setTimeout(() => {
                    hide("correct");
                }, 1000);
                generateQA();
            }else{
                //wrong answer
                hide("correct");
                show("wrong");
                setTimeout(() => {
                    hide("wrong");
                }, 1000);
    
            }
        }
    }
}


