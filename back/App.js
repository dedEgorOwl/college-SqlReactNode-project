const express = require('express');
const mysql = require('mysql');
const axios = require('axios');
const Config = require("./Config.js")
const cors = require('cors')


module.exports = class App {
    static expressApplication = null;
    static mysqlApplication = null;

    static ELoadingStage = {
        mysql: 0b1 << 0,
        web: 0b1 << 1,
    };
    static loadingStage = 0;

    static updateLoading = () => {
        if((App.loadingStage & (App.ELoadingStage.mysql | App.ELoadingStage.web)) == (App.ELoadingStage.mysql | App.ELoadingStage.web)){
            App.onInited();
            return;
        }
        if(App.loadingStage & App.ELoadingStage.mysql == 0b1){
            App.expressApplication.listen(Config.getData()?.web?.port, () => {
                console.log(`Loaded web server on port ${Config.getData()?.web?.port}`)
                App.loadingStage |= App.ELoadingStage.web;
                App.updateLoading();
            });
            return;
        }
        if(App.loadingStage & App.ELoadingStage.web == 0b1){
            return;
        }
    }

    static onInited = () => {}

    static init = () => {
        App.expressApplication = express();
        App.expressApplication.use(express.json());
        App.expressApplication.options('*', cors()) 
        App.mysqlApplication = mysql.createConnection({
            host     : Config.getData()?.mysql?.host,
            user     : Config.getData()?.mysql?.user,
            password : Config.getData()?.mysql?.password,
            database : Config.getData()?.mysql?.database
        });

        App.loadingStage = 0;

        App.registerWebListens();

        App.mysqlApplication.connect((err)=>{
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
             
            console.log('Success connected to mysql server! As id ' + App.mysqlApplication.threadId);
            App.loadingStage |= App.ELoadingStage.mysql;
            App.updateLoading();
        })
    }

    static registerWebListens = () => {
        App.expressApplication.post("/api", cors(), (req, res) => {
            console.log(req.body)
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
            if(req.body?.method == null) {
                res.json({
                    error: "Not found params method"
                });

                return;
            }
            let formID = 0;
            switch(req.body.method) {
                case 'setFormData':
                    if(req.body?.formId == null) {
                        res.json({
                            error: "Not found params formId"
                        });
                        return;
                    }

                    formID = parseInt(req.body?.formId);
                    if(isNaN(formID)){
                        res.json({
                            status: "error",
                            error: "Param formID is not valid!"
                        });
                        return;
                    }

                    if(formID < 0 || formID > 10){
                        res.json({
                            status: "error",
                            error: "Param formID is from 0 to 10"
                        });
                        return;
                    }
                    console.log(formID)

                    switch(formID){
                        case 0:
                        App.mysqlApplication.query("UPDATE `implementers` SET `impName` = ?, `impExp` = ?, `impPosition` = ?, `impSalary` = ? WHERE `implementers`.`imp_id` = '?';", [req.body.data[1], req.body.data[2], req.body.data[3], req.body.data[4], req.body.data[0]], (error, results, fields) => {
                            console.log(error);
                            res.json({
                                status: "ok", 
                            })
                        });
                        break;
                        case 1:
                            App.mysqlApplication.query("UPDATE `pricings` SET `orderType` = ?, `orderPrice` = ?, `orderTime` = ? WHERE `pricings`.`price_id` = '?';", [req.body.data[1], req.body.data[2], req.body.data[3], req.body.data[0]], (error, results, fields) => {
                                console.log(error);
                                res.json({
                                    status: "ok", 
                                })
                            });
                            break;
												case 2:
                            App.mysqlApplication.query("UPDATE `prizes` SET `prizePosition` = ?, `prizeValue` = ? WHERE `prizes`.`prize_id` = '?';", [req.body.data[1], req.body.data[2], req.body.data[0]], (error, results, fields) => {
                                console.log(error);
                                res.json({
                                    status: "ok", 
                                })
                            });
                            break;
												case 3:
                            App.mysqlApplication.query("UPDATE `users` SET `userName` = ?, `userEmail` = ?, `userOrderCount` = ?  WHERE `users`.`id` = '?';", [req.body.data[1], req.body.data[2], req.body.data[3], req.body.data[0]], (error, results, fields) => {
                                console.log(error);
                                res.json({
                                    status: "ok", 
                                })
                            });
                            break;
												case 4:
                            App.mysqlApplication.query("UPDATE `orders` SET `userEmail` = ?, `userName` = ?, `orderType` = ?, `orderPrice` = ?, `orderTime` = ?, `orderImp` = ?  WHERE `orders`.`order_id` = '?';", [req.body.data[1], req.body.data[2], req.body.data[3], req.body.data[4], req.body.data[5], req.body.data[6], req.body.data[0]], (error, results, fields) => {
                                console.log(error);
                                res.json({
                                    status: "ok", 
                                })
                            });
                            break;
												case 5:
                            App.mysqlApplication.query("UPDATE `samplePhotos` SET `photoName` = ?, `photoPath` = ? WHERE `samplePhotos`.`photo_id` = '?';", [req.body.data[1], req.body.data[2], req.body.data[0]], (error, results, fields) => {
                                console.log(error);
                                res.json({
                                    status: "ok", 
                                })
                            });
                            break;
												case 6:
                            App.mysqlApplication.query("UPDATE `samplePhotos` SET `photoName` = ?, `photoPath` = ? WHERE `samplePhotos`.`photo_id` = '?';", [req.body.data[1], req.body.data[2], req.body.data[0]], (error, results, fields) => {
                                console.log(error);
                                res.json({
                                    status: "ok", 
                                })
                            });
                            break;
                    }


                    return;
                case 'getFormData':
                    if(req.body?.formId == null) {
                        res.json({
                            error: "Not found params formId"
                        });
                        return;
                    }

                    formID = parseInt(req.body?.formId);

                    if(isNaN(formID)){
                        res.json({
                            status: "error",
                            error: "Param formID is not valid!"
                        });
                        return;
                    }

                    if(formID < 0 || formID > 10){
                        res.json({
                            status: "error",
                            error: "Param formID is from 0 to 10"
                        });
                        return;
                    }

                    switch(formID){
                        case 0:
                        App.mysqlApplication.query('SELECT * FROM implementers', (error, results, fields) => {
                            if (error) throw error;
                            res.json({
                                status: "ok", 
                                data: results
                            })
                        });
                        break;
                        case 1:
                            App.mysqlApplication.query('SELECT * FROM pricings', (error, results, fields) => {
                                if (error) throw error;
                                res.json({
                                    status: "ok", 
                                    data: results
                                })
                            });
                            break;
												case 2:
                            App.mysqlApplication.query('SELECT * FROM prizes', (error, results, fields) => {
                                if (error) throw error;
                                res.json({
                                    status: "ok", 
                                    data: results
                                })
                            });
                            break;
												case 3:
                            App.mysqlApplication.query('SELECT * FROM users', (error, results, fields) => {
                                if (error) throw error;
                                res.json({
                                    status: "ok", 
                                    data: results
                                })
                            });
                            break;
												case 4:
                            App.mysqlApplication.query('SELECT * FROM orders', (error, results, fields) => {
                                if (error) throw error;
                                res.json({
                                    status: "ok", 
                                    data: results
                                })
                            });
                            break;
												case 5:
                            App.mysqlApplication.query('SELECT * FROM samplePhotos', (error, results, fields) => {
                                if (error) throw error;
                                res.json({
                                    status: "ok", 
                                    data: results
                                })
                            });
                            break;
												case 6:
                            App.mysqlApplication.query('SELECT id, userName, userOrderCount FROM users WHERE userOrderCount > 0', (error, results, fields) => {
                                if (error) throw error;
                                res.json({
                                    status: "ok", 
                                    data: results
                                })
                            });
                            break;
												case 7:
                            App.mysqlApplication.query('SELECT * FROM prizes', (error, results, fields) => {
                                if (error) throw error;
                                res.json({
                                    status: "ok", 
                                    data: results
                                })
                            });
                            break;
												case 8:
                            App.mysqlApplication.query('SELECT imp_id, impName, impPosition, impSalary FROM implementers', (error, results, fields) => {
                                if (error) throw error;
                                res.json({
                                    status: "ok", 
                                    data: results
                                })
                            });
                            break;
												case 9:
                            App.mysqlApplication.query('SELECT * FROM samplePhotos WHERE photoName = "Cats"', (error, results, fields) => {
                                if (error) throw error;
                                res.json({
                                    status: "ok", 
                                    data: results
                                })
                            });
                            break;
												case 10:
                            App.mysqlApplication.query('SELECT order_id, userEmail, orderPrice FROM orders ', (error, results, fields) => {
                                if (error) throw error;
                                res.json({
                                    status: "ok", 
                                    data: results
                                })
                            });
                            break;
                    }

                    return;
                default:
                    res.json({
                        status: "error", 
                        error: `Not found method - ${req.body.method}`
                    });
                    return;
            }

        
            
        })
    }

    static test = () => {
        axios.post('http://127.0.0.1:8800/api', {
            method: "getFormData",
            formId: 1,
            data: [1, 'test', 500, 1],
        }).then((data)=>{
            console.log(data.data);
        })
    }
}