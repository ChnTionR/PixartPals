const {checkExists} = require('./database.js')

const chars = "ABCDEFGHIJKLMNOPQRXTUVWXYZabcdefghijklmnopqrxtuvwxyz1234567890_"

async function generateID(len){
    let randomId
    do{
        randomId = ''
        for(let i=0;i<len;i++){
            randomId += chars[Math.floor(Math.random() * 63)]
        }

        console.log('generated id: ' + randomId)
    }while(await checkExists('id', 'users', randomId))
    
    return randomId
}

module.exports = {
    generateID
}