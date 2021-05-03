const fetch = require('node-fetch');
const sysHeaders = require('../../utils/headers')
const client = require('../../client');

async function run(timezone, deviceId) {
    const headers = sysHeaders(deviceId);
    
    let tz;

    if (timezone != undefined) {
        tz = timezone
    } else {
        tz = 0
    }

    const postData = {
        "timezone": tz,
        "timestamp": Date.now() * 1000
    }

    fetch(`${client.options.api}/x${comId}/s/check-in`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(postData)
    }).then((res) => {
        out = res.status
    });

    return out;
}

module.exports.run = run;