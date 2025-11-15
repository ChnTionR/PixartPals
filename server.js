import {saveUser} from './database.js'
import { generateID } from './utilFunctions.js'
import express from 'express'

const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded())

//root address visited
app.get('/', (req, res)=>{
    res.redirect('/home')
})

//home page visited
app.get('/home',(req,res)=>{
    res.render('home.ejs')
})

//login page visited
app.get('/login',(req,res)=>{
    res.render('login.ejs')
})

//signup page visited
app.get('/signup', (req,res)=>{
    res.render('signup.ejs')
})

//created an account
app.post('/signup', (req,res)=>{
    const userInfo = req.body;

    saveUser(userInfo.signup_name, userInfo.signup_password, generateID(16))

    res.render('thanks.ejs')
})

app.listen(8080,()=>{console.log("http://localhost:8080")})