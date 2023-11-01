const ChatBot = async (message, msg) => {

    message.react("⚙️");

    // const {BingChat} = await import('bing-chat');
    const {BingChat} = await import('bing-chat-rnz');
    const {oraPromise} = await import('ora');
    
    const api = new BingChat({ cookie: process.env.BING_COOKIE });

    const resposta = await oraPromise(api.sendMessage(msg), {
        text: msg,
        //Precise, Balanced, Creative
        variant: 'Balanced'
    });
    
    // const resposta = await api.sendMessage(msg);

    // console.log(resposta);
    // console.log(resposta.text);

    message.reply(resposta.text);
   
    return resposta;
};

module.exports = ChatBot;