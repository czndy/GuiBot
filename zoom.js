const fs = require('fs');
const axios = require('axios');

const Zoom = (message) => {

    message.reply(`Por favor, espere cerca de 15 segundos para entrar na reunião.
    Entre na reunião dentro de 2 minutos. Caso contrário, a reunião será encerrada.

    (Não seja muito rápido nem muito devagar pra entrar na reunião, equilíbrio é tudo kkkkk)

    *Eu vou sair após os 2 minutos terminarem e passarei o host pra quem estiver conectado*

    Join Zoom Meeting
    https://us04web.zoom.us/j/3983559809?pwd=342Fl0FvRCSFnrZWGXENaSPPp7WbgW.1

    Meeting ID: 398 355 9809
    Passcode: H5q48Z
    `)

    var options = {
    method: 'GET',
    url: 'http://127.0.0.1:5000/zoom'
    };

    axios.request(options).then(function (response) {
        message.reply(response.data);
    }).catch(function (error) {
        message.reply("Um erro ocorreu.");
    });
}

module.exports = Zoom;