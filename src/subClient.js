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
     * @param {String} message Message content.
     * @param {String} chatId Id of the chat.
     * @param {Number} messageType The type of message.
     */
    sendMessage(message, chatId, messageType){
        require('./actions/sub/sendMessage').run(message, chatId, messageType, this.comId, this.deviceId);
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

    /**
     * 
     * @param {String} blogId Id of the blog.
     */
     deleteBlog(blogId){
        require('./actions/sub/deleteBlog').run(blogId, this.deviceId, this.comId);
    }

    /**
     * 
     * @param {String} wikiId Id of the wiki.
     */
     deleteWiki(wikiId){
        require('./actions/sub/deleteWiki').run(wikiId, this.deviceId, this.comId);
    }

    /**
     * 
     * @param {String} comment Repost comment.
     * @param {String} blogId Id of the blog.
     */
     repostBlog(comment, blogId){
        require('./actions/sub/repostBlog').run(comment, blogId, this.deviceId, this.comId);
    }

    /**
     * @param {Number} timezone Timezone of the checkin.
     */
     checkIn(timezone){
        require('./actions/sub/checkIn').run(timezone, this.deviceId, this.comId);
    }
}

// ? Exports for other files.
module.exports = { subClient };