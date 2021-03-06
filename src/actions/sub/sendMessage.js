const fetch = require('node-fetch');
const sysHeaders = require('../../utils/headers')
const client = require('../../client');

async function run(message, chatId, messageType, comId, deviceId) {
    const headers = sysHeaders(deviceId);
    
    let msgType = 0;

    if(messageType != null) {
        msgType = messageType;
    }

    const postData = {
        "type": msgType,
        "content": message,
        "clientRefId": (Date.now() * 1000) / 10 % 1000000000,
        "timestamp": Date.now() * 1000
    }

    fetch(`${client.options.api}/x${comId}/s/chat/thread/${chatId}/message`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(postData),
    }).then((res) => {
        out = res.status
    });

    return out;
}

module.exports.run = run;