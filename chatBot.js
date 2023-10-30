const axios = require('axios');

//const TextoParaAudio = require('./textoParaAudio');

const ChatBot = (message, msg) => {

    message.react("⚙️");

    function getRandomKey(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        //console.log("key utilizada:", randomIndex);
        return array[randomIndex];
    }

    const api_keys = [
        //process.env.guicozendey,
        process.env.cozendey01,
        // process.env.cozendey02,
        // process.env.cozendey03,
        // process.env.cozendey04,
        // process.env.czndy2020
    ];

    const randomItem = getRandomKey(api_keys);

    let options = {
        method: 'POST',
        //url: 'https://chatgpt53.p.rapidapi.com/',
        url: 'https://chatgpt-chatgpt3-5-chatgpt4.p.rapidapi.com/gpt4',
        headers: {
            //'Accept-Encoding': 'gzip, deflate',
            'content-type': 'application/json',
            'X-RapidAPI-Key': randomItem,
            // 'X-RapidAPI-Host': 'chatgpt53.p.rapidapi.com'
            'X-RapidAPI-Host': 'chatgpt-chatgpt3-5-chatgpt4.p.rapidapi.com'
        },
        data: {
            //"model": "gpt-3.5-turbo",
            // gpt-4
            // gpt-4-0314
            // gpt-4-0613
            "model": "gpt-4",
            "messages": [
                {
                    "role": "user",
                    "content": `${msg}.`
                },
                // {
                //     "role": "system",
                //     "content": "'Nome':'Guibot', 'Meu criador':'Guilherme Cozendey', 'Context':'Mecanismo que responde qualquer pergunta por whatsapp desenvolvido em Node.js consumindo a API do Chat GPT, mecanismo de transcrição de áudios desenvolvido em Python e mecanismo de vocalização desenvolvido em python'"
                // }
            ]
        }
        
    };

    axios.request(options).then( (response) => {
        resposta = response.data.choices[0].message.content;
        message.reply(resposta);
        //TextoParaAudio(resposta, message);

    }).catch( (error) => {
        //console.log("error", error)
        message.reply("Ih meu chapa, deu ruim: " + error);
        //TextoParaAudio("Ih meu chapa, deu ruim", message);
    });

    return;
};

module.exports = ChatBot;