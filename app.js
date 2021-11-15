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
//let rounds = document.querySelector('input[id="rounds"]')
let playButton = document.querySelector('button[id="play"]')
// playButton.addEventListener('unclick', getSequence(rounds.innerHTML))

// /* Function to get the game sequence with the inputed number of rounds*/
// async function getSequence(rounds) {
//     try {
//         let response = await axios.get(`http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=getSolution&rounds=${rounds}`)
//         console.log(response.data.key)
//     }
//     catch (err) {
//         console.log('Error!\n\ number: ' +err.errno+'\n\ code: '+err.code)
//     }
// }

/* When the start button is pressed ... */
playButton.addEventListener('click', function (click) 
    {for (let i = 0; i < startSeq.length; i ++) {
        playStartSeq(i)
    }
})
/* ... play the start sequence */
function playStartSeq(i) {
    setTimeout(() => {
        if (startSeq[i] == 'R') {
            new Audio('/sounds/red.wav').play()
        }
        else if (startSeq[i] == 'Y') {
            new Audio('/sounds/yellow.wav').play()
        }
        else if (startSeq[i] == 'G') {
            new Audio('/sounds/green.wav').play()
        }
        else if (startSeq[i] == 'B') {
            new Audio('/sounds/blue.wav').play()
    }}, 120*i)
}