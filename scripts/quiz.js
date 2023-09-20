// ---DOM elements--- //

const questionText = document.getElementById('question');

const answers = document.querySelectorAll('.answer');

const quizImage = document.getElementById('quizImage');

const characterFace = document.getElementById('characterFace');

const reactionText = document.getElementById('reactionText');

const scoreElement = document.getElementById('scoreElement');

const endScreen = document.getElementById('endScreen');


// ---Counters--- //

let scoreCounter =  0;

let questionCounter = 0;




// ---Question Objects--- //

// Object holding question array, image file path, and correct answer as
// a value to be compared against for scoring.
const quizQuestions = [
    {
        title: "What tree is this leaf from?",

        answerText: ["Ash", "Hazel", "Sycamore"],

        correct: "Ash",

        image: "images/ash-tree-leaf.jpg"
    },

    {
        title: "What is the name of this tree?",

        answerText: ["Beech", "Western Hemlock", "Wild Cherry"],

        correct: "Wild Cherry",

        image: "images/wild-cherry-tree.jpg"
    },
    {
        title: "What tree is this leaf from?",

        answerText: ["Lodgepole Pine", "Ash", "Rowan"],

        correct: "Rowan",

        image: "images/rowan-tree-leaf.jpg"
    },

    {
        title: "What is the name of this tree?",

        answerText: ["Wild Cherry", "Sycamore", "Scots Pine"],

        correct: "Sycamore",

        image: "images/sycamore-tree.jpg"
    },
    {
        title: "What tree is this leaf from?",

        answerText: ["Western Hemlock", "Beech", "Oak"],

        correct: "Oak",

        image: "images/oak-tree-leaf.jpg"
    },

    {
        title: "What is the name of this tree?",

        answerText: ["Wild Cherry", "Ash", "Scots Pine"],

        correct: "Scots Pine",

        image: "images/scots-pine-tree.jpg"
    },
    {
        title: "What tree is this leaf from?",

        answerText: ["Hazel", "Yew", "Silver Birch"],

        correct: "Yew",

        image: "images/yew-tree-leaf.jpg"
    },

    {
        title: "What is the name of this tree?",

        answerText: ["Silver Birch", "Scots Pine", "Norway Spruce"],

        correct: "Silver Birch",

        image: "images/silver-birch-tree.jpg"
    },
    {
        title: "What tree is this leaf from?",

        answerText: ["Rowan", "Norway Spruce", "Sycamore"],

        correct: "Norway Spruce",

        image: "images/norway-spruce-leaf.jpg"
    },

    {
        title: "What is the name of this tree?",

        answerText: ["Oak", "Scots Pine", "Lodgepole Pine"],

        correct: "Lodgepole Pine",

        image: "images/lodgepole-pine-tree.jpg"
    }
];



// ---Initialising function calls--- //

showScore();

showQuestion(quizQuestions[questionCounter]);



// ---Functions--- //

function showScore() {  // Shows the current score on the page.

    scoreElement.textContent = scoreCounter;
}



function showQuestion(question) {   // Change page content to show current question.

    // Question title, image, and answer DOM elements will be 
    // populated using values from question object.
    questionText.textContent = question.title;

    quizImage.setAttribute('src', question.image);

    answers.forEach(function(element, index) {
        element.textContent = question.answerText[index];
        element.removeEventListener('click', processAnswer);
        element.addEventListener('click', processAnswer);
    })
}



function processAnswer(e) {     // Handles answer click events.

    if (questionCounter < 9) {

        if (e.target.textContent == quizQuestions[questionCounter].correct) {
            console.log('Correct'); // Compares the text content of answer DOM element
                                    // with the correct answer value from object

            scoreCounter++; // Increase score counter by one.
            showScore();

            characterFace.setAttribute('data', 'graphics/tilly-happy-face-quiz.svg');
            reactionText.textContent = 'That\'s right!'; // Change image based on answer.

            setTimeout(resetReaction, 2000); // Resets character image to default after 2000ms.

            questionCounter++; //Increase question counter by 1.
            showQuestion(quizQuestions[questionCounter]);
        } else {
            console.log('Wrong');

            characterFace.setAttribute('data', 'graphics/tilly-surprised-face-quiz.svg');
            reactionText.textContent = 'That\'s the wrong answer!';

            setTimeout(resetReaction, 2000);

            questionCounter++;
            showQuestion(quizQuestions[questionCounter]);
        }
    } else { // Triggered if question counter is 9 or above.
        if (e.target.textContent == quizQuestions[questionCounter].correct) {
            scoreCounter++;
        }
        console.log('End of Quiz');
        endQuiz();
    }

    
}

function resetReaction() {  //Resets the characters face and text using setTimeout.

    characterFace.setAttribute('data', 'graphics/tilly-normal-face-quiz.svg');
    reactionText.textContent = '';

}

function endQuiz() {    // Show end-screen.

    endScreen.classList.add('show'); // Corresponds to CSS class code.

    const endText = document.getElementById('endScreenText');

    endText.textContent = `Your score is ${scoreCounter}.`

    switch (true) {     // Alters end message based on final score.
        case (scoreCounter <= 3):
            endText.textContent += ' Keep learning, you\'ll get there!';
            break;
        case (scoreCounter > 3 && scoreCounter <= 7):
            endText.textContent += ' You\'ve learned a lot, keep it up!';
            break;
        case (scoreCounter > 7):
            endText.textContent += ' You know your trees! Excellent job!'
        
    }

    const restartBtn = document.getElementById('restartBtn');

    restartBtn.addEventListener('click', refreshQuiz);

}

function refreshQuiz() {        // Resets score and question counters, removes end-screen.
    
    endScreen.classList.remove('show');

    questionCounter = 0;

    scoreCounter = 0;

    showScore();
    
    showQuestion(quizQuestions[questionCounter]);
}