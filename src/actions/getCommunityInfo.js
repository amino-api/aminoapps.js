const fetch = require('node-fetch');
const client = require('../client');
const db = require('./data/user.json');

async function run(comId, cb, deviceId) {
    return new Promise((resolve) => {
        const headersV1 = {
            "NDCDEVICEID": deviceId,
            "NDCAUTH": db[deviceId].NDCAUTH,
            "NDC-MSG-SIG": "AaauX/ZA2gM3ozqk1U5j6ek89SMu",
            "Accept-Language": "en-US",
            "Content-Type": "application/json; charset=utf-8",
            "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 7.1; LG-UK495 Build/MRA58K; com.narvii.amino.master/3.3.33180)",
            "Host": "service.narvii.com",
            "Accept-Encoding": "gzip",
            "Connection": "Keep-Alive"
        }

        fetch(`${client.options.api}/g/s-x${comId}/community/info?withInfluencerList=1&withTopicList=true&influencerListOrderStrategy=fansCount`, {
            method: "GET",
            headers: headersV1,
        }).then(res => res.json()).then(data => {
            return resolve(cb(data));
        }).catch((e) => {
            resolve(e)
        })
    })
}

module.exports.run = run;