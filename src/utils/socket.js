let socket = require('ws');
const debugMode = require('./conf.json').debug;

let conn;
let thisConn;
let connOpen = false;

function connect(connectObj){

    let constuctor = connectObj

    if(!connectObj) constuctor = thisConn;

    conn = new socket(constuctor.uri + `/?signbody=${constuctor.deviceId}%7C${Date.now() * 1000}`,  {
        "headers": {
            "NDCDEVICEID": constuctor.deviceId,
            "NDCAUTH": constuctor.auth
        }
    });

    conn.on('close', (clx) => {
        console.log('[WS | CLOSED]', clx)

        try {
            console.log('[WS | Reconnecting!]')
        } catch(e){
            console.log(`[WS | ERROR] ${e}`);
        }
    })
    conn.on("open", (x) => {
        console.log('[WS | Opened]');
    });
    conn.on("unexpected-response", (e) => {
        try {
            conn.close();
        } catch(e){
            console.log(`[WS | ERROR] ${e}`);
        }
    })
    conn.on('error', (err) => {
        console.log('[WS Error]', err)
    })
}

function onMsgHandler(cb){
    conn.on("message", (msg) => {
        let filteredMsg = {
            message: {
                author: "Unknown",
            }
        }

        const newMsg = JSON.parse(msg).o.chatMessage

        if(!msg) {
            console.log(filteredMsg)
            return cb(filteredMsg)
        }
        filteredMsg = {
            ndcId: JSON.parse(msg).o.ndcId,
            message: {
                author: {
                    uid: newMsg.author.uid,
                    status: newMsg.author.status,
                    icon: newMsg.author.icon,
                    reputation: newMsg.author.reputation,
                    role: newMsg.author.role,
                    nickname: newMsg.author.nickname,
                    level: newMsg.author.level,
                    accountMembershipStatus: newMsg.author.accountMembershipStatus
                },
                chatId: newMsg.threadId,
                mediaType: newMsg.mediaType,
                content: newMsg.content,
                clientRefId: newMsg.clientRefId,
                messageId: newMsg.messageId,
                uid: newMsg.uid,
                createdTime: newMsg.createdTime,
                type: newMsg.type,
                isHidden: newMsg.isHidden,
                includedInSummary: newMsg.includedInSummary,
                extension: newMsg.extension
            }
        }
        return cb(filteredMsg);
    });
}

class WebSocket {
    /**
     * @param {String} deviceId 
     */
    constructor(deviceId, ndcauth, debug){
        this.uri = 'wss://ws2.narvii.com';
        this.deviceId = deviceId;
        this.debug = debug;
        this.auth = ndcauth;
        //? if the user has no client.db
        if(!this.auth) return console.log('[WS Error] No ndcauth found!');

        thisConn = this;

        connect(this)

        setInterval(() => {
            if(debugMode){
                console.log('[WS | DEBUG] RESTARTING WS');
            }
            conn.close();
            connect(this);
        }, 30000);
    }

    /**
     * 
     * @param {Function} cb This returns the message json.
     */
    onMessage(cb){
        onMsgHandler(cb)
    }
} 

module.exports = WebSocket;