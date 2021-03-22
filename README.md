# AminoApps.js

---

### Contents
- [Examples](#examples)

---

### Examples

```js

const amino = require('aminoapps.js');

const client = new amino.client('DeviceId'); // A valid device id

client.login('email', 'password', (d) => { // d = User data

    const subClient = new amino.subClient(client, 28357725); // Initialize a subclient

    subClient.ws.onMessage(x => { // Listen for messages
        if(x.message.content == '!ping'){ // Command args
            subClient.sendMessage(x.message.chatId, "Hi", 0) // send a message
        } else if(x.message.content == '!ap'){ // Another command
            subClient.sendMessage(x.message.chatId, "Hi! Currently you can only use the '!ping' command!", 0); // Return message
        }
    })

});

```