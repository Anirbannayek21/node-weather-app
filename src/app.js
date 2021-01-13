
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const weatherReport = require('./utils/weather')

// return the path of current directory
console.log(__dirname)

// return the path of current file
console.log(__filename)
const app = express()

const port = process.env.PORT || 3000

// create the path to the directory
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')
console.log(publicDirectoryPath)
console.log(viewsPath)
console.log(partialPath)

// hbs/handlebars ar use to show dynmic templates

// add handlebar engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

// add location for static content like html,css,js,img
app.use(express.static(publicDirectoryPath))

// render index.hbs from loction of view(viewspath)
app.get('',(req,res)=>{
    res.render('index',{
        title : "Weather APP",
        name : "Anirban"
    })
})

// render help.hbs from loction of view(viewspath)
app.get("/help",(req,res)=>{
    res.render('help',{
        title : 'Help',
        name: 'user'
    })
})

// render about.hbs from loction of view(viewspath)
app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About',
        name:'Anirban'
    })
})

// send is use to return/show some line of html,json
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : "address not found ."
        })
    }

    const address = req.query.address

    weatherReport.weather(address,(error,forcast)=>{
        if(error){
            return res.render('error')
        }
        else{
            return res.send(
                forcast,
            )
        }  
    })

})

app.get('*',(req,res)=>{
    res.render('error')
})


// listen is use to run the whole thing in a local port(any number)
app.listen(port,()=>{
    console.log('server run in port '+port)
})