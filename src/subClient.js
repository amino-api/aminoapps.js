const fetch = require('node-fetch');
const fs = require('fs');
const chalk = require('chalk');
const versionChecker = require('./utils/versionChecker')
const headers = require('./utils/headers')
const pkg = require('../package.json');
const client = require('./client');
const db = require('./actions/data/user.json');
const WebSocket = require('./utils/socket');
const config = require('./utils/conf.json');

let options = {
    api: "https://service.narvii.com/api/v1"
}

class subClient {

    /**
     * @param {Object} clientObject The client object.
     * @param {Number} comId The selected community id.
     */
    constructor(clientObject, comId){
        this.client = clientObject;
        this.deviceId = this.client.deviceId;
        this.comId = comId;
        this.globalUser = db[this.client.deviceId];

        if(!this.globalUser) throw Error(chalk.red('No global user passed.'))

        this.ws = new WebSocket(this.deviceId, this.globalUser.NDCAUTH, config.debug);
    }

    /**
     * 
     * @param {String} comId Community ID.
     * @param {Function} cb Callback to get data from response.
     * ? Non functional yet.
     */
    // getCommunityInfo(comId, cb){
    //     require('./actions/sub/getCommunityInfo.js').run(comId, cb, this.deviceId);
    // }

    /**
     * 
     * @param {String} chatId The chat id.
     * @param {String} content Message content.
     * @param {number} type Message type.
     * @returns {string} undefined 
     */
    sendMessage(chatId, content, type){
        require('./actions/sub/sendMessage').run(chatId, content, type, this.comId, this.deviceId);
    }

    /**
     * 
     * @param {String} title Your blog title.
     * @param {String} content Blog content.
     * @param {String} backgroundColor Blog background color.
     * @param {Boolean} fansOnly Is only for fans.
     * @param {Object} extensions Object of extensions.
     */
    createBlog(title, content, backgroundColor, fansOnly, extensions){
        require('./actions/sub/postBlog').run(title, content, backgroundColor, fansOnly, extensions, this.deviceId, this.comId);
    }
}

// ? Exports for other files.
module.exports = { subClient };