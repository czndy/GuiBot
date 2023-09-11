const fs = require('fs');
const axios = require('axios');

const AudioParaTexto = (media, message) => {
    let base64data = media.data;

    let fileName = new Date().toJSON().split('.')[0].replaceAll(':','_');

    fs.writeFileSync(
        `../SPEECH TO TEXT/audios/${fileName}.ogg`,
        Buffer.from(
            base64data, 'base64'
        )
    );

    var options = {
    method: 'POST',
    url: 'http://127.0.0.1:5000/',
    headers: {'Content-Type': 'application/json'},
    data: {file_name: fileName}
    };

    axios.request(options).then(function (response) {
    message.reply(response.data);
    }).catch(function (error) {
        message.reply("Ocorreu um erro ao transcrever seu áudio");
    });
}

module.exports = AudioParaTexto;