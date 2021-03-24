const fetch = require('node-fetch');
const fs = require('fs');
const headers = require('../utils/headers')
const client = require('../client');
const error = require('../utils/error');
const db = require('./data/user.json');

async function run(email, password, cb, deviceId) {
    return new Promise((resolve) => {
        const headersV1 = {
            "NDCDEVICEID": deviceId,
            "NDC-MSG-SIG": "AaauX/ZA2gM3ozqk1U5j6ek89SMu",
            "Accept-Language": "en-US",
            "Content-Type": "application/json; charset=utf-8",
            "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 7.1; LG-UK495 Build/MRA58K; com.narvii.amino.master/3.3.33180)",
            "Host": "service.narvii.com",
            "Accept-Encoding": "gzip",
            "Connection": "Keep-Alive"
        }

        const postData = {
            "email": email,
            "v": 2,
            "secret": `0 ${password}`,
            "deviceID": deviceId,
            "clientType": 100,
            "action": "normal",
            "timestamp": Date.now() * 1000
        }

        fetch(`${client.options.api}/g/s/auth/login`, {
            method: "POST",
            headers: headersV1,
            body: JSON.stringify(postData)
        }).then(res => res.json()).then(data => {
            if(data["api:statuscode"] !== 0) {
                return resolve(cb(data));
            }
            
            client.sid = `sid=${data.sid}`;
            client.contentLength = JSON.stringify(postData).length

            if(!db[deviceId]){
                db[deviceId] = {
                    contentLength: JSON.stringify(postData).length,
                    NDCAUTH: `sid=${data.sid}`,
                    UUID: data.account.uid  
                }
                console.log(db[deviceId])
                fs.writeFile(__dirname + "/data/user.json", JSON.stringify(db), (err) => {
                    if(err) console.log(err);
                });
            } else {
                db[deviceId] = {
                    contentLength: JSON.stringify(postData).length,
                    NDCAUTH: `sid=${data.sid}`,
                    UUID: data.account.uid
                }
                fs.writeFile(__dirname + "/data/user.json", JSON.stringify(db), (err) => {
                    if(err) console.log(err);
                });
            }

            return resolve(cb(data));
        }).catch((e) => {
            resolve(e)
        })
    })
}

module.exports.run = run;