const fetch = require('node-fetch');
const sysHeaders = require('../../utils/headers')
const client = require('../../client');

async function run(blogId, comId, deviceId) {
    const headers = sysHeaders(deviceId);

    fetch(`${client.options.api}/x${comId}/s/blog/${blogId}`, {
        method: 'DELETE',
        headers: headers
    }).then((res) => {
        out = res.status
    });

    return out;
}

module.exports.run = run;