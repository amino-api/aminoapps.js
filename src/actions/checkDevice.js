const fetch = require('node-fetch');
const client = require('../client');
const db = require('./data/user.json');

async function run(deviceID, cb, deviceId) {
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
            "deviceID": deviceID,
            "clientType": 100,
            "bundleID": "com.narvii.amino.master",
            "timezone": 0,
        }
        
        fetch(`${client.options.api}/g/s/device`, {
            method: "POST",
            headers: headersV1,
            body: JSON.stringify(postData)
        }).then(res => res.json()).then(data => {
            return resolve(cb(data));
        }).catch((e) => {
            resolve(e)
        })
    })
}

module.exports.run = run;