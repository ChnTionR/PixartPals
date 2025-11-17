const mysql = require('mysql2')

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'PixartPal'
}).promise()

async function saveUser(name, password, id){
    pool.query("insert into users (name, password, id) values (?, ?, ?)", [name, password, id])
}

async function infoFromName(name){
    try{
        const value = await pool.query("select * from users where name=?", [name])
        return value
    }catch(err){
        console.log(err)
        return null
    }
}

async function infoFromID(id){
    try{
        const value = await pool.query("select * from users where id=?", [id])
        return value
    }catch(err){
        console.log(err)
        return null
    }
}

async function checkExists(column,table,value){
    let tableName
    let columnName
    switch(table){
        case 'users':
            tableName = table
            break
    }

    switch(column){
        case 'name':
        case 'id':
            columnName = column
            break;
    }
    

    const query = mysql.format('select * from ' + tableName + ' where ' + columnName + ' = ?',[value])
    console.log(query)
    const [rows] = await pool.query(query)
    console.log(rows)

    if(rows.length > 0){
        console.log(column+' found')
        return true
    }else{
        console.log('there is no other '+column)
        return false
    }
}

module.exports = {
    saveUser, checkExists, infoFromName, infoFromID
}