const Lembrete = (message, texto, tempo) => {
const {ContagemRespostas, QuantasRespostas} = require('./contagemRespostas');

    message.reply(`lembrete criado para ${texto} daqui ${tempo} segundos`);

    setTimeout(() => {
        
        message.reply(`${texto}`);
        ContagemRespostas();

    }, tempo * 1000);
    
}

module.exports = Lembrete;