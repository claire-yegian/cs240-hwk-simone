//const axios = require('axios')
let startSeq = ['R', 'B', 'Y', 'R', 'B', 'B', 'Y', 'G', 'B', 'R', 'B', 'G']
let gameSeq = [ 'R', 'G', 'Y', 'Y' ]
/* Function to get the start sequence */
// async function getStart() {
//     try {
//         let response = await axios.get('http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=start')
//         return response.data.sequence
//     }
//     catch (err) {
//         return 'Error!\n\ number: ' +err.errno+'\n\ code: '+err.code
//     }
// }
// getStart()
//     .then((result) => {
//         console.log(result)
//     })
//     .catch((err) => {
//         console.log(err)
//     })

/* Get the inputed number of rounds */
//let roundsToPlay = document.querySelector('input[id="rounds"]')
let playButton = document.querySelector('button[id="play"]')
// playButton.addEventListener('unclick', getSequence(roundsToPlay.innerHTML))

// /* Function to get the game sequence with the inputed number of rounds*/
// async function getSequence(numRounds) {
//     try {
//         let response = await axios.get(`http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=getSolution&rounds=${numRounds}`)
//         console.log(response.data.key)
//     }
//     catch (err) {
//         console.log('Error!\n\ number: ' +err.errno+'\n\ code: '+err.code)
//     }
// }

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

/* WHEN THE START BUTTON IS PRESSED ... */
let gameStarted = false
playButton.addEventListener('click', function (click) {
    gameStarted = true
    for (let i = 0; i < startSeq.length; i ++) {
        playStartSeq(i)
    }
    setTimeout(playGame, 4000+120*(startSeq.length))

})
/* ... play the start sequence */
function playStartSeq(i) {
    setTimeout(() => {
        playSound(startSeq[i]);
        //change color
    }, 120*i)
}
/* Play game sequence for appropriate round */
let round = 1; // The round we're on
function playGame() {
    setTimeout(() => {
        for (let i = 0; i < gameSeq.length && i <= round; i ++) {
            playSound(gameSeq[i])
            //change color
        }
    }, 400);
}

/* HANDLE BUTTON PRESSES AND HOVERING */
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
/* Play sound when mouseup */
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

/* USER INTERACTION */
//next button to be pressed
let nextCorrectList = [];
let tempGameSeq = [...gameSeq]
for (j = 0; j < 4; j ++) {
    nextCorrectList.unshift('end round')
    for (i = tempGameSeq.length - 1; i >= 0; i --) {
        nextCorrectList.unshift(tempGameSeq[i])
    }
    tempGameSeq.pop()
}
console.log(nextCorrectList)
console.log(gameSeq.length)

function play(char) {
    if (char == nextCorrectList[0]) {//if correct button pressed
        if (nextCorrectList.length == 1) {//  if the user won
            win()
        }
        else if (nextCorrectList[1] == 'end round') { //  if we've reached the end of the round
            round += 1
            nextCorrectList.shift()
            nextCorrectList.shift()
        }
        else {//  else
            nextCorrectList.shift()
        }
    }
    else {
        lose()
    }
}
//else(wrong button)

function win() {
    console.log('you win!')
}
function lose() {
    console.log('you lose')
}