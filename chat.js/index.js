const ChatApp = require('./chat');

let webinarChat =  new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat =       new ChatApp('---------vk');


let chatOnMessage = (message) => {
    console.log(message);
};

webinarChat.on('message', chatOnMessage);
facebookChat.on('message', chatOnMessage);
vkChat.on('message', chatOnMessage);

let prepare = () => console.log('Готовлюсь к ответу');

webinarChat.on('message', prepare);

vkChat.setMaxListeners(2);

vkChat.on('message', prepare);

vkChat.once('close', () => console.log('Чат вконтакте закрылся :('));






// Закрыть вконтакте
setTimeout( ()=> {
    console.log('Закрываю вконтакте...');
    vkChat.removeAllListeners('message');
    vkChat.close();
}, 10000 );


// Закрыть фейсбук
setTimeout( ()=> {
    console.log('Закрываю фейсбук, все внимание — вебинару!');
    facebookChat.removeListener('message', chatOnMessage);
}, 15000 );

setTimeout( ()=> {
    webinarChat.removeListener('message', chatOnMessage);
    webinarChat.removeListener('message', prepare);
}, 30000 );