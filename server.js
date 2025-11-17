const {checkExists, saveUser, infoFromName, infoFromID} = require('./database.js')
const { generateID } = require('./utilFunctions.js')
const express = require('express')

const cookieParser = require('cookie-parser')

const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded())
app.use(cookieParser())

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
    //if no login record found
    if(req.cookies.user == null){
        res.render('login.ejs')
    }else{
        //parse [name,id] and redirect to /:id
        res.redirect(`/userPage/${JSON.parse(req.cookies.user)[1]}`)
    }
    
})

//signup page visited
app.get('/signup', (req,res)=>{
    res.render('signup.ejs')
})

//created an account
app.post('/signup',async (req,res)=>{
    const userInfo = req.body;
    if(await checkExists('name', 'users', userInfo.signup_name)){
        console.log('that username is already taken')
        res.redirect('/signup')
    }else{
        saveUser(userInfo.signup_name, userInfo.signup_password, await generateID(16))
        res.render('thanks.ejs')

    }
    
})


//login to an account
app.post('/login', async (req, res)=>{
    //get user from name
    const userInfo = req.body
    const result = await infoFromName(userInfo.login_name)
    const foundUser = result[0][0]

    //if no user found redirect to login
    if(foundUser == null){res.redirect('/login')}else{
        //if login successful 
        if(userInfo.login_password == foundUser.password){
            //set cookie to user infos
            const json_str = JSON.stringify([foundUser.name, foundUser.id])
            res.cookie('user',json_str)
            res.redirect(`/userPage/${foundUser.id}`)
        }else{
            res.redirect('/login')
        }
    }
})

//main user page
app.get('/userPage/:userID',(req,res)=>{
    //if url param matches cookies
    const cookies = JSON.parse(req.cookies.user)
    if(req.params.userID == cookies[1]){
        res.render('userPage.ejs',{
            username: cookies[0],
            userID: cookies[1]
        })
    }else{
        res.redirect('/home')
    }
})


//logout
app.post('/logout/:userID', (req,res)=>{
    //if url param matches cookies
    if(JSON.parse(req.cookies.user)[1] == req.params.userID){
        //logout
        res.clearCookie('user')
        res.redirect('/home')
    }else{
        res.redirect('/home')
    }
})

app.listen(8080,()=>{console.log("http://localhost:8080")})