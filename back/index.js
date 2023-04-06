/*const express = require('express');
const axios = require('axios');
const app = express();
const mysql = require('mysql');*/
/*
const HTTP_CODES = {
    ERROR: 400,
    OK: 200
}

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'project-kol'
});

connection.connect(()=> {
    console.log("mysql connected")
});

connection.query(`SELECT * FROM users`, function (error, results, fields) {
    if (error) throw error;
    console.log(results);
});

connection.end();

app.get('/api', (req, res) => {
    if(req.query?.method == null) {
        res.json({
            error: "Not found param method"
        });
        return;
    }

    switch(req.query?.method){
        case 'getData':
            res.send("xuy")
        break;
        default:
            res.json({
                error: "Not found method"
            });
            break;
    }
    //console.log(req.query?.method)
});



app.listen(8800, () => {
    console.log("Started listen 8800 http port")
});



// test

axios.get("http://127.0.0.1:8800/api?kek=kek").then((data)=>{
    console.log(data.data);
})*/

const App = require("./App.js");

App.onInited = () => {
    App.test();
}
App.init();