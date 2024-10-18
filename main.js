const express = require("express");
const {WebSocket} = require("ws");
const  cors = require("cors");
const expressFileUpload= require("express-fileupload");
const fs = require("fs");
const https = require('https');
const path = require("node:path");

let ipAddress = 'http://192.168.34.57'

const homeProperties = {
    light:{
        '1':{name:"Dining Light",state:'off'},
        '2':{name:"Kitchen Light",state:'off'},
        '3':{name:"Park Light",state:'off'},
        '4':{name:"Bathroom Light",state:'off'},
        '5':{name:"Room 1 Light",state:'off'}
    },
    door:{
        '1':{'name':"Gaming Room Door",state:'off'},
        '2':{'name':"Garage Door",state:'off'}
    },
    fan:{
        '1':{'name':"Bedroom Fan",state:"off"}
    }
}
const roomProperties = {
    '1':{
        'name':"Kitchen",
        components:{
            light:[2],
            door:[1],
            fan:[1]
        }
       
    }
}
const app = express();


var key = fs.readFileSync(__dirname + '/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/selfsigned.crt');
var options = {
    key: key,
    cert: cert
};

app.use(cors({origin:"*"}))
app.use(express.json());
app.use(express.static('C:\\Users\\lol44\\Desktop\\HomeAssistant\\fronted2.0\\dist\\fronted2.0\\'))
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());



app.post("/voice-to-text",function (req,res) {
    // console.log(req.files)
    const file = req.files['voice'];



    fs.writeFile("temp.weba",file.data,(err) => {
        // console.log(req)
        if(err){res.status(500).send(err.message)}

        fetch("http://localhost:8000/voice-to-text?filePath=" + path.join(__dirname,"temp.weba"),{method:"GET"}).then(e => {
            // console.log(e)
            return e.json()
        }).then(e => {
            const text = JSON.parse(e)['text']
            console.log(text)
            return res.status(200).send(text)
        }).catch(e=> {
            return res.status(500).send("failed")
        })


    })



})

// Home API
app.get("/api/base",(req,res)=>{
    return res.status(200).send(homeProperties)
})

app.post("/api/light/:id",async(req,res)=>{
    // console.log(req.params)
    // console.log(req.query)
    const lightId = req.params['id'];

    const body = req.body
    homeProperties['light'][lightId.toString()]['state'] = body['state']
    // const prom = await fetch(ipAddress+"/light"+lightId+body['state']).then(e => e.text())
    // console.log(prom)
    return res.status(200).send({changed:true})
})


app.post("/api/door/:id",async(req,res)=>{
    // console.log(req.params)
    // console.log(req.query)
    const doorID = req.params['id'];

    const body = req.body
    console.log(body,doorID , " these is the door id")
    homeProperties['door'][doorID.toString()]['state'] = body['state']
    // const prom = await fetch(ipAddress+"/door"+doorID+body['state']).then(e => e.text())
    // console.log(prom)
    return res.status(200).send({changed:true})
})


app.post("/api/fan/:id",async(req,res)=>{
    // console.log(req.params)
    // console.log(req.query)
    const fanID = req.params['id'];

    const body = req.body
    console.log(body,fanID , " these is the door id")
    homeProperties['fan'][fanID.toString()]['state'] = body['state']
    // const prom = await fetch(ipAddress+"/fan"+fanID+body['state']).then(e => e.text())
    // console.log(prom)
    return res.status(200).send({changed:true})
})

app.get("/api/room/:id",async(req,res) => {
        
    const roomId = req.params['id']
    return res.status(200).send(roomProperties[roomId.toString()])
})


app.post("/api/light1/on",async (req,res) => {
    try{
        const prom = await  fetch(ipAddress+"/light1on").then(e => e.text())
        homeProperties['light1'] = 'on'
        console.log(homeProperties,"request was sent")
        return res.status(200).send({changed:true})
    }catch (error){
    }
})

app.post('/api/light1/off',async (req,res) => {
    try{
        const prom = await  fetch(ipAddress+"/light1off")
        homeProperties['light1'] = 'off'
        return res.status(200).send({changed:true})
    }catch (error){
    }
})


app.use((req,res,next) =>{
    return res.redirect("/")
})

var server = https.createServer(options, app);

server.listen(3000, '0.0.0.0',() => {
    console.log("server starting on port : " + 3000)
});