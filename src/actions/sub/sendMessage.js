const fetch = require('node-fetch');
const fs = require('fs');
const sysHeaders = require('../../utils/headers')
const client = require('../../client');
const error = require('../../utils/error');
const db = require('../data/user.json');

async function run(chatId, content, type, cid, deviceId) {

    const headers = sysHeaders(deviceId);
    const postData = {
        "type": type,
        "content": content,
        "clientRefId": 360979903,
        "attachedObject": null,
        "timestamp": Date.now() * 1000
    }

    let out;

    fetch(`${client.options.api}/x${cid}/s/chat/thread/${chatId}/message`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(postData),
    }).then((res) => {
        out = res.status
    });

    return out;
}

module.exports.run = run;