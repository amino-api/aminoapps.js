const fetch = require('node-fetch');
const sysHeaders = require('../../utils/headers')
const client = require('../../client');

async function run(wikiId, comId, deviceId) {
    const headers = sysHeaders(deviceId);

    fetch(`${client.options.api}/x${comId}/s/item/${wikiId}`, {
        method: 'DELETE',
        headers: headers
    }).then((res) => {
        out = res.status
    });

    return out;
}

module.exports.run = run;