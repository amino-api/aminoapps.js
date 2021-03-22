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
    api: "https://service.narvii.com/api/v1"
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
}

// ? Exports for other files.
module.exports = { Client, setDeviceId, sid, contentLength, options };