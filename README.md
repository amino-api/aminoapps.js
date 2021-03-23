# AminoApps.js

---

### Contents
- [Examples](#examples)

- [References](#references)

---

### Examples

```js

const amino = require('aminoapps.js');

const client = new amino.client('DeviceId'); // A valid device id

client.login('email', 'password', (d) => { // d = User data

    console.log(`Bot logged in as: ${d.userProfile.nickname}`);

    const subClient = new amino.subClient(client, 28357725); // Initialize a subclient

    subClient.ws.onMessage(x => {

        if(x.message.content == '!ping'){

            return subClient.sendMessage(x.message.chatId, "Hi", 0)

        } else if(x.message.content == '!ap'){

            return subClient.sendMessage(x.message.chatId, "Hi! Currently you can only use the '!ping' command!", 0);

        } else if(x.message.content == '!new-blog'){

            subClient.sendMessage(x.message.chatId, "Creating blog...", 100)
            subClient.createBlog('Test blog', 'Created with aminoapps.js', '#C0C0C0', false); // Create blog
            return subClient.sendMessage(x.message.chatId, "Blog created!", 100)

        }

    });

});

```

---

### References


New Client
```js
const client = new amino.client('DeviceId'); 
```

New SubClient
```js
const subClient = new amino.subClient(client, 28357725);
```

onMessage event listener
```js
subClient.ws.onMessage(msg => { console.log(msg) });
```

Send Message
```js
subClient.sendMessage(x.message.chatId, "Hi", 0)
```

Create Blog
```js
subClient.createBlog('Test blog', 'Created with aminoapps.js', '#C0C0C0', false);
```