var questions = [
    {
        question: "Their songs 'This Corrosion' and 'Temple of Love' are in regular rotation in goth clubs to this day. Who are they?",
        answers: ["The Sisters Of Mercy", "Love And Rockets", "Bauhaus", "The Cure"],
        rightAnswer: 0,
        img: "assets/images/goth1.jpg"
    },

    {
        question: "The lead singer of the Cure's pale face and raccoon eyes became an often-imitated look by goths in the 1980s. Who is he?",
        answers: ["Ronny Moorings", "Marilyn Manson", "Robert Smith", "Ian McCulloch"],
        rightAnswer: 2,
        img: "assets/images/goth2.jpg"
    },

    {
        question: "The author of Crash was an early influence on the lyrics of gothic bands. Who is he?",
        answers: ["Clive Barker", "J.G. Ballard", "Philip K. Dick", "Stephen King"],
        rightAnswer: 1,
        img: "assets/images/goth3.jpg"
    },

    {
        question: "This model turned singer recorded with the Velvet Underground before making a string of gothic-sounding albums as a solo artist. Who is she?",
        answers: ["Nico", "Annie Lennox", "Monica Richards", "Siouxsie Sioux"],
        rightAnswer: 0,
        img: "assets/images/goth4.jpg"
    },

    {
        question: "He was the lead singer of Joy Division who died in 1980. Who is he?",
        answers: ["Robert Smith", "Rozz Williams", "Peter Murphy", "Ian Curtis"],
        rightAnswer: 3,
        img: "assets/images/goth5.jpg"
    },

    {
        question: "This original punk band's sound evolved over the years, as evidenced by diverse songs like 'Hong Kong Garden,' 'Spellbound,' 'Cities in Dust' and the Top 40 hit 'Kiss Them for Me.' Who are they?",
        answers: ["Cocteau Twins", "Siouxsie And The Banshees", "Altered Images", "Xmal Deutschland"],
        rightAnswer: 1,
        img: "assets/images/goth6.jpg"
    },

    {
        question: "This 1976 novel by Anne Rice about a brooding character who longed for companionship and love slowly created an audience for goth culture. What is the book?",
        answers: ["The Body Thief", "Interview With The Vampire", "Twilight", "Exquisite Corpse"],
        rightAnswer: 1,
        img: "assets/images/goth7.jpg"
    },

    {
        question: "After Bauhaus broke up, Daniel Ash formed this band, which had the hit song 'Go!' What was the band's name?",
        answers: ["New Order", "The Tom Tom Club", "The Killers", "Tones On Tail"],
        rightAnswer: 3,
        img: "assets/images/goth8.jpg"
    },
];

var rightAnswers;
var currentQuestion;
var answerIndex;
var answerArray;
var timer = {   
    timeLimit: 11,
    reset: function() {   
        timer.timeLimit = 11;
    },
    start: function() {
        startStop = setInterval(timer.countdown, 1000);
    },
    stop: function() {
        clearInterval(startStop);
    },
    countdown: function() {
        if (timer.timeLimit === 0) {
            timer.stop();
            timer.reset();
            currentQuestion++;
            console.log(currentQuestion);
            $("#question").html("<h2>Times Up!! The correct answer was " + answerArray[answerIndex] + "</h2>");
            setTimeout(nextQuestion, 3000);
        }
        else {
            $("#timer").html("<p>Remaining Time: " + timer.timeLimit + "</p>");
            timer.timeLimit--;
        };
    }
};

function restart() {
    rightAnswers = 0;
    currentQuestion = 0;
    $("#question").html("<h2>Are you goth or NOT?</h2>");
    $("#start").show();
};

function nextQuestion() {
    timer.start();
    answerIndex = questions[currentQuestion].rightAnswer;
    $("#question").html("<h3>" + questions[currentQuestion].question + "</h3>");
    $(".answers").html("<img class='img-responsive img-rounded image' src='" + questions[currentQuestion].img + "'>")
    answerArray = questions[currentQuestion].answers;
    for (var i = 0; i < answerArray.length; i++) {
        $(".answers").append("<div class='btn btn-primary answerchoice' data-name=" + i + ">" + answerArray[i] + "</div>")
    };
};

$(document).ready(function() {
    
    restart();

    $("#start").on("click", function() {
        $(this).hide();
        nextQuestion();
    });

    $(".answers").on("click", ".answerchoice", function() {
        var answerClicked = $(this).attr("data-name");
        timer.stop();
        timer.reset();
        currentQuestion++;
        $(".answers").empty();  
        if (parseInt(answerClicked) === answerIndex) {
            rightAnswers++;
            $("#question").html("<h2>Correct!!!</h2>");
        }
        else {
            $("#question").html("<h2>Wrong!! The correct answer was " + answerArray[answerIndex] + "</h2>");
        };
        if (currentQuestion === 8) {
            $(".answers").html("<h2>Number Correct: " + rightAnswers + "</h2><h2>Number Wrong: " + eval(8 - rightAnswers) + "</h2>");
            $(".answers").append("<div class='btn btn-primary reset'>Reset</div>")
        }
        else {
            setTimeout(nextQuestion, 3000);
        };
    });

});
