const express = require("express")
const fs = require("fs")
const app = express()
const router = express.Router()
const PORT = 8080
var path = require('path')

function storeData(reqbody) {

    fs.readFile(__dirname + '/data/data.json', 'utf-8', function readFileCallback(err,data){
        var obj = {
            comments: []
        };
        if (err){
            console.log(err);
        } else {
            obj = JSON.parse(data);
            obj.comments.push({title: reqbody.content, author: "Akira", date: reqbody.date});
            json = JSON.stringify(obj);
            fs.writeFile(__dirname + '/data/data.json', json, err => {
                if (err) {
                    console.error(err);
                }
            })
            objBankString = "comments = " + JSON.stringify(obj.comments);
            fs.writeFile(__dirname + '/js/bankData.js', objBankString, err => {
                if (err) {
                    console.error(err);
                }
            })
        }
    })
}

app.use(express.static(path.join(__dirname, '/')));

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.post('/shakibank.html', function(req, res) {
    console.log(req.body);
    storeData(req.body);
  });


router.get('/', (_, res) => {
    res.sendFile(path.join(__dirname+'/html/index.html'));
})

router.get('/index.html', (_, res) => {
    res.sendFile(path.join(__dirname+'/html/index.html'));
})

router.get('/akiRoulette.html', (_, res) => {
    res.sendFile(path.join(__dirname+'/html/akiRoulette.html'));
})

router.get('/shakaEtat.html', (_, res) => {
    res.sendFile(path.join(__dirname+'/html/shakaEtat.html'));
})

router.get('/shakiBank.html', (_, res) => {
    res.sendFile(path.join(__dirname+'/html/shakiBank.html'));
})

app.use('/', router)

app.listen(process.env.port || PORT)


