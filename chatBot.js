const ChatBot = async (message, msg) => {

    message.react("⚙️");

    const {BingChat} = await import('bing-chat');
    const {oraPromise} = await import('ora');
    
    const api = new BingChat({ cookie: process.env.BING_COOKIE });

    const resposta = await oraPromise(api.sendMessage(msg), {
        text: msg
    });
    
    console.log(resposta.text);

    message.reply(resposta);
   
    return;
};

module.exports = ChatBot;