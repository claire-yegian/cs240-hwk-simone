const axios = require('axios')

let startSeq = [] // The start sequence
let gameSeq = [] // The game sequence
/* */
/* GETTING SEQUENCES FROM THE API */
/* */
/* Function to get the start sequence */
async function getStart() {
    try {
        let response = await axios.get('http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=start')
        return response.data.sequence
    }
    catch (err) {
        return 'Error!\n\ number: ' +err.errno+'\n\ code: '+err.code
    }
}
/* Call the start sequence retrieving function */
getStart()
    .then((result) => {
        startSeq = (result)
    })
    .catch((err) => {
        alert(err)
        startSeq = []
        gameSeq = []
    })

/* Get the inputed number of rounds */
let roundsToPlay = document.querySelector('input[id="rounds"]')
let playButton = document.querySelector('button[id="play"]')

/* Function to get the game sequence with the inputed number of rounds */
async function getSequence(numRounds) {
    try {
        let response = await axios.get(`http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=getSolution&rounds=${numRounds}`)
        gameSeq = (response.data.key)
    }
    catch (err) {
        alert('Error!\n\ number: ' +err.errno+'\n\ code: '+err.code)
        startSeq = []
        gameSeq = []
    }
}


/* */
/* BASIC FUNCTIONS */
/* */
/* Which color's sound to play? */
function playSound(color) {
    if (color == 'R') {
        new Audio('/sounds/red.wav').play()
    }
    else if (color == 'Y') {
        new Audio('/sounds/yellow.wav').play()
    }
    else if (color == 'G') {
        new Audio('/sounds/green.wav').play()
    }
    else if (color == 'B') {
        new Audio('/sounds/blue.wav').play()
    }
}

/* Convert color's character to query selected button */
function toColor(char) {
    if (char == 'R') {
        let toReturn = document.querySelector('div[class="red"]')
        if (toReturn == null) {
            toReturn = document.querySelector('div[class="lightred"]')
        }
        return toReturn
    }
    else if (char == 'Y') {
        let toReturn = document.querySelector('div[class="yellow"]')
        if (toReturn == null) {
            toReturn = document.querySelector('div[class="lightyellow"]')
        }
        return toReturn
    }
    else if (char == 'G') {
        let toReturn = document.querySelector('div[class="green"]')
        if (toReturn == null) {
            toReturn = document.querySelector('div[class="lightgreen"]')
        }
        return toReturn
    }
    else {
        let toReturn = document.querySelector('div[class="blue"]')
        if (toReturn == null) {
            toReturn = document.querySelector('div[class="lightblue"]')
        }
        return toReturn
    }
}


/* */
/* WHEN THE START BUTTON IS PRESSED ... */
/* */
let gameStarted = false
playButton.addEventListener('click', async function (click) {
    // Reset all of the values
    gameStarted = true
    round = 1
    correctThisRound = 0
    message.innerHTML = ''
    document.body.style.background = "black"
    totalRounds = roundsToPlay.value
    // Call the get functions for game sequence, start sequence, and 
    // list of correct button presses
    let done = await getSequence(totalRounds)
    nextButtons()
    getStart()
    .then((result) => {
        startSeq = (result)
    })
    .catch((err) => {
        alert(err)
        startSeq = []
        gameSeq = []
    })
    // Play the start sequence and the first round of the game
    for (let i = 0; i < startSeq.length; i ++) {
        playStartSeq(i)
    }
    setTimeout(playGameSeq, 3880+120*(startSeq.length))

})

/* ... play the start sequence */
function playStartSeq(i) {
    let colorButton = toColor(startSeq[i])
    setTimeout(() => {
        colorButton.classList.replace(colorButton.classList[0],'light'+colorButton.classList[0])
        setTimeout(() => {
            if (colorButton.classList[0].substring(0,5) == 'light') {
                colorButton.classList.replace(colorButton.classList[0],colorButton.classList[0].substring(5))
            }
        }, 119);
        playSound(startSeq[i]);
    }, 120*i)
}

/* Play game sequence for appropriate round */
let round = 1 // The round we're on
function playGameSeq() {
    i = 0 // To increment with position in gameSeq
    k = 0 // To increment with position in nextCorrectList
    let colorButton2 = toColor(gameSeq[i])
    for (let j = 1; j <= gameSeq.length && j <= round; j ++) {
        setTimeout(() => {
            let colorButton2 = toColor(gameSeq[i])
            setTimeout(() => {
                colorButton2.classList.replace(colorButton2.classList[0],'light'+colorButton2.classList[0])
                setTimeout(() => {
                    if (colorButton2.classList[0].substring(0,5) == 'light') {
                        colorButton2.classList.replace(colorButton2.classList[0],colorButton2.classList[0].substring(5))
                    }
                }, 350);
                playSound(nextCorrectList[k])
                k ++
            }, 400*i);
            i ++
        }, 400);
    }
}


/* */
/* HANDLE BUTTON PRESSES AND HOVERING */
/* */
let colorButtons = document.querySelectorAll('div')
/* Change button border to white when hovering over */
for (let i = 0; i < colorButtons.length; i ++) {
    colorButtons[i].addEventListener('mouseover', () => {(colorButtons[i].classList.add('hover'))})
    colorButtons[i].addEventListener('mouseout', () => {(colorButtons[i].classList.remove('hover'))})
}

/* Change button color when mousedown */
for (let i = 0; i < colorButtons.length; i ++) {
    colorButtons[i].addEventListener('mousedown', () => {
        (colorButtons[i].classList.replace(colorButtons[i].classList[0],'light'+colorButtons[i].classList[0]))})
    document.addEventListener('mouseup', () => {
        if (colorButtons[i].classList[0].substring(0,5) == 'light') {
            colorButtons[i].classList.replace(colorButtons[i].classList[0],colorButtons[i].classList[0].substring(5))
        }})
    document.addEventListener('mouseout', () => {
        if (colorButtons[i].classList[0].substring(0,5) == 'light') {
            colorButtons[i].classList.replace(colorButtons[i].classList[0],colorButtons[i].classList[0].substring(5))
        }})
}

/* Play sound and make a move in the game (if started) when mouseup */
for (let i = 0; i < colorButtons.length; i ++) {
    colorButtons[i].addEventListener('mouseup', () => {
        if(colorButtons[i].classList[0].substring(0,5)=='light') {
            let colorChar = colorButtons[i].classList[0].charAt(5).toUpperCase()
            playSound(colorChar)
            if (gameStarted) {
                play(colorChar)
            }
        }
    })
}


/* */
/* USER INTERACTION */
/* */
/* Create a list of next buttons to be pressed */
let nextCorrectList = []; // The list of next buttons
function nextButtons() {
    let nextList = [];
    let tempGameSeq = [...gameSeq]
    for (j = 0; j < totalRounds; j ++) {
        for (i = tempGameSeq.length - 1; i >= 0; i --) {
            nextList.unshift(tempGameSeq[i])
        }
        tempGameSeq.pop()
    }
    nextCorrectList = nextList
}

/* Function to track the user's interaction with the game and respond accordingly */
let correctThisRound = 0
function play(char) {
    if (char == nextCorrectList[0]) { // If correct button pressed
        if (nextCorrectList.length == 1) { // If the user won
            win()
        }
        else { // Otherwise
            nextCorrectList.shift()
            correctThisRound ++
            if (correctThisRound == round) {
                round ++
                correctThisRound = 0
                nextRound()
            }
            else {
                correct()
            }
        }
    }
    else { // If the user pressed the wrong button
        lose()
    }
}

/* Functions to handle each outcome of a user's button press */
let message = document.querySelector('p[id="status"]')
let totalRounds = gameSeq.length
function win() { // If they win
    new Audio('/sounds/win.mp3').play()
    message.innerHTML = "Yay you win!"
    document.body.style.background = "deepskyblue"
    gameStarted = false
}
async function lose() { // If they lose
    let wrong = await new Audio('/sounds/wrong.wav').play()
    new Audio('/sounds/lose.wav').play()
    message.innerHTML = "Incorrect! You lose!"
    document.body.style.background = "hotpink"
    gameStarted = false
}
function correct() { // If they press the correct button, but don't move to next round or win
    message.innerHTML = `So far so good! ${totalRounds-round} more rounds to go!`
}
function nextRound() { // If they advance to the next round
    new Audio('/sounds/nextRound.wav').play()
    message.innerHTML = "Good job! Prepare for next round."
    setTimeout(() => {
        message.innerHTML = `Round ${round} of ${totalRounds}`
    }, 800);
    setTimeout(() => {
        playGameSeq()
    }, 800);
}