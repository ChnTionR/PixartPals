import * as mysql from 'mysql2'
//const mysql = require('mysql2')

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'PixartPal'
}).promise()

export async function saveUser(name, password, id){
    pool.query("insert into users (name, password, id) values (?, ?, ?)", [name, password, id])
}

export function checkExists(column,table,value){
    let tableName
    switch(table){
        case 'users':
            tableName = table
            break
    }

    let rows = []
    let promise = pool.query('select * from ' + tableName + ' where ? = ?',[column,value])

    promise.then(
        (value)=>{[rows] = value}
    )

    if(rows.legth > 0){
        return true
    }else{
        return false
    }
}