const fetch = require('node-fetch');
const fs = require('fs');
const chalk = require('chalk');
const versionChecker = require('./utils/versionChecker')
const headers = require('./utils/headers')
const pkg = require('../package.json');
const db = require('./actions/data/user.json');

const npmReg = 'http://registry.npmjs.org/' + pkg.name;
versionChecker()

let options = {
    api: "https://service.narvii.com/api/v1",
    new_whisper: 'https://prod.whisper.sh/user/new'
}

// ? Needed vars
let sid;
let setDeviceId;
let contentLength;

class Client {

    /**
     * @param {String} deviceId Your device id. 
     */
    constructor(deviceId){
        this.deviceId = deviceId;
        this.email;
        this.password;
    }

    /**
     * 
     * @param {String} email Bot account email.
     * @param {String} password Bot account password.
     * @param {Function} cb Callback to get data from response.
     */
    async login(email, password, cb){
        this.email = email;
        this.password = password;
        require('./actions/login').run(email, password, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} email Bot account email.
     * @param {String} password Bot account password.
     * @param {Function} cb Callback to get data from response.
     */
    async restore(email, password, cb){
        require('./actions/restore').run(email, password, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} email Bot account email.
     * @param {String} code Verification code.
     * @param {Function} cb Callback to get data from response.
     */
    async activate(email, code, cb){
        require('./actions/activate').run(email, code, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} deviceID Device id.
     * @param {Function} cb Callback to get data from response.
     */
    async checkDevice(deviceID, cb){
        require('./actions/checkDevice').run(deviceID, cb, this.deviceId);
    }

    /**
     * 
     * @param {Function} cb Callback to get data from response.
     */
    async getAccountInfo(cb){
        require('./actions/getAccountInfo').run(cb, this.deviceId);
    }
    
    /**
     * 
     * @param {Number} start Where to start the list.
     * @param {Number} size Size of the list.
     * @param {Function} cb Callback to get data from response.
     */
    async getJoinedCommunities(start, size, cb){
        require('./actions/getJoinedCommunities').run(start, size, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} userId Id of the user.
     * @param {Function} cb Callback to get data from response.
     */
    async getUserInfo(userId, cb){
        require('./actions/getUserInfo').run(userId, cb, this.deviceId);
    }

    /**
     * 
     * @param {Number} start Where to start the list.
     * @param {Number} size Size of the list.
     * @param {Function} cb Callback to get data from response.
     */
    async getJoinedChats(start, size, cb){
        require('./actions/getJoinedChats').run(start, size, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} chatId Id of the chat.
     * @param {Function} cb Callback to get data from response.
     */
    async getChatInfo(chatId, cb){
        require('./actions/getChatInfo').run(chatId, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} chatId Id of the chat.
     * @param {Number} start Where to start the list.
     * @param {Number} size Size of the list.
     * @param {Function} cb Callback to get data from response.
     */
    async getChatUsers(chatId, start, size, cb){
        require('./actions/getChatUsers').run(chatId, start, size, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} chatId Id of the chat.
     * @param {Function} cb Callback to get data from response.
     */
    async joinChat(chatId, cb){
        require('./actions/joinChat').run(chatId, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} chatId Id of the chat.
     * @param {Function} cb Callback to get data from response.
     */
    async leaveChat(chatId, cb){
        require('./actions/leaveChat').run(chatId, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} userId Id of the user.
     * @param {String} chatId Id of the chat.
     * @param {Boolean} allowRejoin If the user can join back.
     * @param {Function} cb Callback to get data from response.
     */
    async kick(userId, chatId, allowRejoin, cb){
        require('./actions/kick').run(userId, chatId, allowRejoin, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} chatId Id of the chat.
     * @param {Number} size Size of the list.
     * @param {Function} cb Callback to get data from response.
     */
    async getChatMessages(chatId, size, cb){
        require('./actions/getChatMessages').run(chatId, size, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} chatId Id of the chat.
     * @param {String} messageId Id of the message.
     * @param {Function} cb Callback to get data from response.
     */
    async getMessageInfo(chatId, messageId, cb){
        require('./actions/getMessageInfo').run(chatId, messageId, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} comId Id of the community.
     * @param {Function} cb Callback to get data from response.
     */
    async getCommunityInfo(comId, cb){
        require('./actions/getCommunityInfo').run(comId, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} aminoId Id of the amino.
     * @param {Function} cb Callback to get data from response.
     */
    async searchCommunity(aminoId, cb){
        require('./actions/searchCommunity').run(aminoId, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} userId Id of the user.
     * @param {Number} start Where to start the list.
     * @param {Number} size Size of the list.
     * @param {Function} cb Callback to get data from response.
     */
    async getUserFollowing(userId, start, size, cb){
        require('./actions/getUserFollowing').run(userId, start, size, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} userId Id of the user.
     * @param {Number} start Where to start the list.
     * @param {Number} size Size of the list.
     * @param {Function} cb Callback to get data from response.
     */
    async getUserFollowers(userId, start, size, cb){
        require('./actions/getUserFollowers').run(userId, start, size, cb, this.deviceId);
    }

    /**
     * 
     * @param {Number} start Where to start the list.
     * @param {Number} size Size of the list.
     * @param {Function} cb Callback to get data from response.
     */
    async getBlockedUsers(start, size, cb){
        require('./actions/getBlockedUsers').run(start, size, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} blogId Id of the blog.
     * @param {Function} cb Callback to get data from response.
     */
    async getBlogInfo(blogId, cb){
        require('./actions/getBlogInfo').run(blogId, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} wikiId Id of the wiki.
     * @param {Function} cb Callback to get data from response.
     */
    async getWikiInfo(wikiId, cb){
        require('./actions/getWikiInfo').run(wikiId, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} blogId Id of the blog.
     * @param {String} sorting Sorting of the comments.
     * @param {Number} start Where to start the list.
     * @param {Number} size Size of the list.
     * @param {Function} cb Callback to get data from response.
     */
    async getBlogComments(blogId, sorting, start, size, cb){
        require('./actions/getBlogComments').run(blogId, sorting, start, size, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} wikiId Id of the wiki.
     * @param {String} sorting Sorting of the comments.
     * @param {Number} start Where to start the list.
     * @param {Number} size Size of the list.
     * @param {Function} cb Callback to get data from response.
     */
    // ? Sorting can be 'newest', 'oldest', 'vote'
    async getWikiComments(wikiId, sorting, start, size, cb){
        require('./actions/getWikiComments').run(wikiId, sorting, start, size, cb, this.deviceId);
    }

    /**
     * 
     * @param {Number} start Where to start the list.
     * @param {Number} size Size of the list.
     * @param {Function} cb Callback to get data from response.
     */
    async getBlockerUsers(start, size, cb){
        require('./actions/getBlockerUsers').run(start, size, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} userId Id of the user.
     * @param {String} sorting Sorting of the comments.
     * @param {Number} start Where to start the list.
     * @param {Number} size Size of the list.
     * @param {Function} cb Callback to get data from response.
     */
    // ? Sorting can be 'newest', 'oldest', 'vote'
    async getWallComments(userId, sorting, start, size, cb){
        require('./actions/getWallComments').run(userId, sorting, start, size, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} message Message content.
     * @param {String} chatId Id of the chat.
     * @param {Number} messageType The type of message.
     * @param {Function} cb Callback to get data from response.
     */
    async sendMessage(message, chatId, cb, messageType){
        require('./actions/sendMessage').run(message, chatId, messageType, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} messageId Id of the message.
     * @param {String} chatId Id of the chat.
     * @param {Boolean} asStaff Remove message as staff.
     * @param {Function} cb Callback to get data from response.
     */
    async deleteMessage(messageId, chatId, asStaff, cb){
        require('./actions/deleteMessage').run(messageId, chatId, asStaff, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} userId Id of the user.
     * @param {Function} cb Callback to get data from response.
     */
    async follow(userId, cb){
        require('./actions/follow').run(userId, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} userId Id of the user.
     * @param {Function} cb Callback to get data from response.
     */
    async unfollow(userId, cb){
        require('./actions/unfollow').run(userId, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} userId Id of the user.
     * @param {Function} cb Callback to get data from response.
     */
    async block(userId, cb){
        require('./actions/block').run(userId, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} userId Id of the user.
     * @param {Function} cb Callback to get data from response.
     */
    async unblock(userId, cb){
        require('./actions/unblock').run(userId, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} comId Id of the community.
     * @param {Function} cb Callback to get data from response.
     */
    async joinCommunity(comId, cb){
        require('./actions/joinCommunity').run(comId, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} comId Id of the community.
     * @param {Function} cb Callback to get data from response.
     */
    async leaveCommunity(comId, cb){
        require('./actions/leaveCommunity').run(comId, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} comId Id of the community.
     * @param {String} message Request message.
     * @param {Function} cb Callback to get data from response.
     */
    async requestJoinCommunity(comId, message, cb){
        require('./actions/requestJoinCommunity').run(comId, message, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} aminoId New profile amino id.
     * @param {Function} cb Callback to get data from response.
     */
    async changeAminoId(aminoId, cb){
        require('./actions/changeAminoId').run(aminoId, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} userId Id of the user.
     * @param {Function} cb Callback to get data from response.
     */
    async getLinkedCommunities(userId, cb){
        require('./actions/getLinkedCommunities').run(userId, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} userId Id of the user.
     * @param {Function} cb Callback to get data from response.
     */
    async getUnlinkedCommunities(userId, cb){
        require('./actions/getUnlinkedCommunities').run(userId, cb, this.deviceId);
    }

    /**
     * 
     * @param {Array} comIds List of ids of the communities.
     * @param {Function} cb Callback to get data from response.
     */
    async reorderLinkedCommunities(comIds, cb){
        require('./actions/reorderLinkedCommunities').run(comIds, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} comId Id of the community.
     * @param {Function} cb Callback to get data from response.
     */
    async addLinkedCommunity(comId, cb){
        require('./actions/addLinkedCommunity').run(comId, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} comId Id of the community.
     * @param {Function} cb Callback to get data from response.
     */
    async removeLinkedCommunity(comId, cb){
        require('./actions/removeLinkedCommunity').run(comId, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} blogId Id of the blog.
     * @param {Function} cb Callback to get data from response.
     */
    async likeBlog(blogId, cb){
        require('./actions/likeBlog').run(blogId, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} blogId Id of the blog.
     * @param {Function} cb Callback to get data from response.
     */
    async unlikeBlog(blogId, cb){
        require('./actions/unlikeBlog').run(blogId, cb, this.deviceId);
    }

    /**
     * 
     * @param {Function} cb Callback to get data from response.
     */
    async getMembershipInfo(cb){
        require('./actions/getMembershipInfo').run(cb, this.deviceId);
    }

    /**
     * 
     * @param {Function} cb Callback to get data from response.
     */
    async getWalletInfo(cb){
        require('./actions/getWalletInfo').run(cb, this.deviceId);
    }

    /**
     * 
     * @param {Number} start Where to start the list.
     * @param {Number} size Size of the list.
     * @param {Function} cb Callback to get data from response.
     */
    async getWalletHistory(start, size, cb){
        require('./actions/getWalletHistory').run(start, size, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} deviceID Device id.
     * @param {Function} cb Callback to get data from response.
     */
    async getFromDeviceId(deviceID, cb){
        require('./actions/getFromDeviceId').run(deviceID, cb, this.deviceId);
    }

    /**
     * 
     * @param {String} url Target url.
     * @param {Function} cb Callback to get data from response.
     */
    async getFromCode(url, cb){
        require('./actions/getFromCode').run(url, cb, this.deviceId);
    }

    /**
     * 
     * @param {Function} cb Callback to get data from response.
     */
    async getSupportedLanguages(cb){
        require('./actions/getSupportedLanguages').run(cb, this.deviceId);
    }

    /**
     * 
     * @param {Function} cb Callback to get data from response.
     */
    async claimNewUserCoupon(cb){
        require('./actions/claimNewUserCoupon').run(cb, this.deviceId);
    }

    /**
     * 
     * @param {Number} start Where to start the list.
     * @param {Number} size Size of the list.
     * @param {Function} cb Callback to get data from response.
     */
    async getSubscriptions(start, size, cb){
        require('./actions/getSubscriptions').run(start, size, cb, this.deviceId);
    }

    /**
     * 
     * @param {Number} start Where to start the list.
     * @param {Number} size Size of the list.
     * @param {Function} cb Callback to get data from response.
     */
    async getUsers(start, size, cb){
        require('./actions/getUsers').run(start, size, cb, this.deviceId);
    }
}

// ? Exports for other files.
module.exports = { Client, setDeviceId, sid, contentLength, options };