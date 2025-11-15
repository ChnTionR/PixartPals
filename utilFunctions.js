import { checkExists } from "./database.js";

const chars = "ABCDEFGHIJKLMNOPQRXTUVWXYZabcdefghijklmnopqrxtuvwxyz1234567890!@#$%&*_?"

export function generateID(len){
    let randomId
    do{
        randomId = ''
        for(let i=0;i<len;i++){
            randomId += chars[Math.floor(Math.random() * 71)]
        }

        console.log('generated id: ' + randomId)
    }while(checkExists(`id`, `users`, randomId))
    
    return randomId
}