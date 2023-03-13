const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Surfspot = require('./models/surfspot')

const app = express();

mongoose.connect("mongodb+srv://janraadts:XmlLKsEpQrgpDY5M@surfspots.pancwyp.mongodb.net/spotguide?retryWrites=true&w=majority")
.then(()=>{
    console.log('connected to db')
}).catch(()=>{
    console.log('Connection to DB failed')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use((req, res, next)=> {
res.setHeader('Access-Control-Allow-Origin','*');
res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
next();
});

app.post('api/surfspots', (req, res, next)=> {
    const surfspot = new Surfspot(req.body)
    console.log(surfspot)
    surfspot.save()
    res.status(201).json({
        message: 'surfspot added with success'
    })
})

app.get('/api/surfspots',(req, res, next)=> {
    Surfspot.find()
    .then(documents => {
        res.status(200).json(documents);
        console.log('successful fetch')
    })
    .catch(()=>{
        console.log('fetch failed')
    })
   
});

module.exports = app