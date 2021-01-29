import express from 'express'
import mongoose from "mongoose"
import Cors from 'cors'
import Cars from './Cars.js'

var app = express()
var port = process.env.PORT || 8080 

app.use(express.json())
app.use(Cors())

var Connection_url = 'mongodb+srv://Rest-API_lmas:RQVkHH6Z0Vwz6ZmP@cluster0.gklyj.mongodb.net/restapilmas?retryWrites=true&w=majority'

mongoose.connect(Connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})


app.get("/", function (req, res){
    res.send( "Welcome to Tutorial of REST API using MongoDB, ExpressJS and NodeJS");
})

app.get("/Cars", function (req, res) {
    
    try {
        Cars.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(data)
        }
    })
    } catch (error) {
        console.log(error);
    }
})

app.post("/Cars_add", function (req, res) {

    const dbfeed = req.body
    try {
        Cars.create(dbfeed, (err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(201).send(data)
        }
    })
    } catch (error) {
        console.log(error);
    }
})

app.get("/Cars/:id", function (req, res) { 
    
    Cars.remove({ _id: req.params.id },(err, data) => {
        if (err){ 
            res.status(500).send(err)
        }else{ 
            res.status(200).send(data)  
        } 
    })
})



app.listen(port)