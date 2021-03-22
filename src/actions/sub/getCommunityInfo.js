const fetch = require('node-fetch');
const axios = require('axios');
const fs = require('fs');
const sysHeaders = require('../../utils/headers')
const client = require('../../client');
const error = require('../../utils/error');
const db = require('../data/user.json');

async function run(comId, cb, deviceId) {

    const headers = sysHeaders(deviceId);

    const reqConf = {
        method: 'GET',
        headers,
        url: `${client.options.api}/g/s-x${comId}/community/info?withInfluencerList=1&withTopicList=true&influencerListOrderStrategy=fansCount`
    }
    axios(reqConf).then(res => {
        if(res.status !== 200){
            return res.data;
        }
        return console.log(res.data);
    });
}

module.exports.run = run;