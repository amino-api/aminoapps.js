const fetch = require('node-fetch');
const fs = require('fs');
const sysHeaders = require('../../utils/headers')
const client = require('../../client');
const error = require('../../utils/error');
const db = require('../data/user.json');
var wait = ms => new Promise((r, j) => setTimeout(r, ms))

async function run(title, content, backgroundColor, fansOnly, deviceId, cid) {
    let fansonlyStatus = true;
    if(fansOnly !== true) fansonlyStatus = false;

    let backgroundColorObj;
    if(backgroundColor) backgroundColorObj = {"style": { "backgroundColor": backgroundColor }};

    const headers = sysHeaders(deviceId);
    const postData = {
        "address": null,
        "content": content,
        "title": title,
        "mediaList": [], // ? Make this for a future update.
        "extensions": {
            fansOnly: fansonlyStatus,
            backgroundColorObj
        },
        "latitude": 0,
        "longitude": 0,
        "eventSource": "GlobalComposeMenu",
        "timestamp": Date.now() * 1000
    }

    

    let out;
    fetch(`${client.options.api}/x${cid}/s/blog`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(postData),
    }).then((res) => {
        out = res
    });

    await wait(300);

    return out;
}

module.exports.run = run;