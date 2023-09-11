const axios = require('axios');
const {MessageMedia} = require('whatsapp-web.js');

const DeletaArquivo = (path) => {

    var options = {
        method: 'POST',
        url: 'http://127.0.0.1:5000/deltts',
        data: {
            path:path
        },
        headers: {
            'Content-Type':'application/json'
        }
    };

    axios.request(options).then(function (response) {
                
    }).catch(function (error) {
        console.log("Erro ao deletar");
        console.log(error)
    });
}

const TextoParaAudio = (texto, message) => {    

    var options = {
        method: 'POST',
        url: 'http://127.0.0.1:5000/tts',
        data: {
            text:texto
        },
        headers: {
            'Content-Type':'application/json'
        }
    };

    axios.request(options).then(function (response) {
        message.reply(MessageMedia.fromFilePath(`D:/TI/Projetos pessoais/SPEECH TO TEXT/audios/${response.data}`));
        DeletaArquivo(response.data);
    }).catch(function (error) {
        message.reply("Um erro ocorreu.");
        console.log(error)
    });     

}

module.exports = TextoParaAudio;