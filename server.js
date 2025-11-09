const ejs = require('ejs');
const express = require('express');

const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
    res.redirect('/home')
})

app.get('/home',(req,res)=>{
    res.render('home.ejs')
})

app.get('/login',(req,res)=>{
    res.render('login.ejs')
})

app.get('/signup', (req,res)=>{
    res.render('signup.ejs')
})

app.post('/thanks', (req,res)=>{
    res.render('thanks.ejs')
})

app.listen(8080,()=>{console.log("http://localhost:8080")})