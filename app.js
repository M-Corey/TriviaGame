var triviaQuestions = [{
    question: "What is just a fancy Toyota?",
    answerList: ["Acura", "Lexus", "Infinity", "Fiat"],
    answer: 1
}, {
    question: "what is the correct way to tighten lug nuts?",
    answerList: ["Stat Pattern", "any way you want", "call a tow truck", "in a circle pattern"],
    answer: 0
}, {
    question: "what tool should you use to tighten lug nuts?",
    answerList: ["torque wrench", "air gun", "1/4 ratchet", "adjustalble wrench"],
    answer: 0
}, {
    question: "At what what percent is tint is illigal in MA?",
    answerList: ["35%", "40%", "34%", "38%"],
    answer: 2
}, {
    question: "what is a 2 door called?",
    answerList: ["sedan", "crossoverr", "hatchback", "coupe"],
    answer: 3
}, {
    question: "what does X mean in BMW models?",
    answerList: ["All wheel drive", "Xtreme edition", "Xtra cargo apce", "LuXury"],
    answer: 0
}, {
    question: "BMW's 2002 was made in what years",
    answerList: ["2002-2010", "1969-1974", "1980-1990", "1995-2000"],
    answer: 1
}, {
    question: "what band re-named their current tour to 'break-a-leg'?",
    answerList: ["Cardi B", "Linkin Park", "Foo Fighters", "System of a down"],
    answer: 2
}, {
    question: "what letterdo you always guess if you have no idea what the anwser is?",
    answerList: ["B", "C", "A", "D"],
    answer: 1
}];

var QuestionsArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9'];
var messages = {
    correct: "Correct!!",
    incorrect: "Wrong! Better luck on the next question",
    endTime: "tick tock tick tock, too slow",
    finished: "Results"
}

$('#startBtn').on('click', function () {
    $(this).hide();
    newGame();
});

$('#startOverBtn').on('click', function () {
    $(this).hide();
    newGame();
});

function newGame() {
    $('#finalMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
    $('#unanswered').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
}

function newQuestion() {
    $('#message').empty();
    $('#correctedAnswer').empty();
    answered = true;

    //sets up new questions & answerList
    $('#currentQuestion').html('Question #' + (currentQuestion + 1) + '/' + triviaQuestions.length);
    $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
    for (var i = 0; i < 4; i++) {
        var choices = $('<div>');
        choices.text(triviaQuestions[currentQuestion].answerList[i]);
        choices.attr({ 'data-index': i });
        choices.addClass('thisChoice');
        $('.answerList').append(choices);
    }
    countdown();
    //clicking an answer will pause the time and setup answerPage
    $('.thisChoice').on('click', function () {
        userSelect = $(this).data('index');
        clearInterval(time);
        answerPage();
    });
}

function countdown() {
    seconds = 15;
    $('#timeLeft').html('<h2>Time Remaining: ' + seconds + '</h2>');
    answered = true;
    time = setInterval(showCountdown, 1000);
}

function showCountdown() {
    seconds--;
    $('#timeLeft').html('<h2>Time Remaining: ' + seconds + '</h2>');
    if (seconds < 1) {
        clearInterval(time);
        answered = false;
        answerPage();
    }
}

function answerPage() {
    $('#currentQuestion').empty();
    $('.thisChoice').empty();
    $('.question').empty();

    var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    if ((userSelect == rightAnswerIndex) && (answered == true)) {
        correctAnswer++;
        $('#message').html(messages.correct);
    } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
        incorrectAnswer++;
        $('#message').html(messages.incorrect);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
    } else {
        unanswered++;
        $('#message').html(messages.endTime);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        answered = true;
    }

    if (currentQuestion == (triviaQuestions.length - 1)) {
        setTimeout(scoreboard, 1000)
    } else {
        currentQuestion++;
        setTimeout(newQuestion, 1000);
    }
}

function scoreboard() {
    $('#timeLeft').empty();
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#finalMessage').html(messages.finished);
    $('#correctAnswers').html("Correct Answers: " + correctAnswer);
    $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
    $('#unanswered').html("Unanswered: " + unanswered);
    $('#startOverBtn').addClass('reset');
    $('#startOverBtn').show();
    $('#startOverBtn').html('Start Over?');
}
