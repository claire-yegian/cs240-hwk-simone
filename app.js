const axios = require('axios')

async function getStart() {
    try {
        let response = await axios.get("http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=start")
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