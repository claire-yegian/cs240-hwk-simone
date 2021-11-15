const axios = require('axios')

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
getStart()
    .then((result) => {
        console.log(result)
    })
    .catch((err) => {
        console.log(err)
    })

/* Get the inputed number of rounds */
// let rounds = document.querySelector('input[id="rounds"]')
// let playButton = document.querySelector('button[id="play"]')
// playButton.addEventListener('unclick', getSequence(rounds.innerHTML))

/* Function to get the game sequence with the inputed number of rounds*/
async function getSequence(rounds) {
    try {
        let response = await axios.get(`http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=getSolution&rounds=${rounds}`)
        console.log(response.data.key)
    }
    catch (err) {
        console.log('Error!\n\ number: ' +err.errno+'\n\ code: '+err.code)
    }
}