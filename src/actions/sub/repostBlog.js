const fetch = require('node-fetch');
const sysHeaders = require('../../utils/headers')
const client = require('../../client');

async function run(comment, blogId, comId, deviceId) {
    const headers = sysHeaders(deviceId);

    const postData = {
        "content": comment,
        "refObjectId": blogId,
        "refObjectType": 1,
        "type": 2,
        "timestamp": Date.now() * 1000
    }

    fetch(`${client.options.api}/x${comId}/s/blog`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(postData)
    }).then((res) => {
        out = res.status
    });

    return out;
}

module.exports.run = run;