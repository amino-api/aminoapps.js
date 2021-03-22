const fs = require('fs');
const client = require('../client');
const db = require('../actions/data/user.json');
let deviceId;

module.exports = function(device){
    deviceId = device;

    let headers;
    if(db[deviceId]){
        headers = {
            "NDCDEVICEID": deviceId,
            "NDC-MSG-SIG": "AaauX/ZA2gM3ozqk1U5j6ek89SMu",
            "Accept-Language": "en-US",
            "Content-Type": "application/json; charset=utf-8",
            "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 7.1; LG-UK495 Build/MRA58K; com.narvii.amino.master/3.3.33180)",
            "Host": "service.narvii.com",
            "Accept-Encoding": "gzip",
            "Connection": "Keep-Alive",
            "Content-Length": db[deviceId].contentLength,
            "NDCAUTH": db[deviceId].NDCAUTH
        }
    } else {
        headers = {
            "NDCDEVICEID": deviceId,
            "NDC-MSG-SIG": "AaauX/ZA2gM3ozqk1U5j6ek89SMu",
            "Accept-Language": "en-US",
            "Content-Type": "application/json; charset=utf-8",
            "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 7.1; LG-UK495 Build/MRA58K; com.narvii.amino.master/3.3.33180)",
            "Host": "service.narvii.com",
            "Accept-Encoding": "gzip",
            "Connection": "Keep-Alive"
        }
    }
    return headers;
};