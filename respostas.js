const Piadas = require('./piadas');
const {ContagemRespostas, QuantasRespostas} = require('./contagemRespostas');

const Respostas = ()=>{
    let listaPiadas = Piadas();
    
    return {
        '@todos': function(){return},
        'oi guibot': function(nome){return (nome == "Isa Amor ♥️")?"E aí gatinha, vem sempre aqui?":`Olá, ${nome}.\nVocê pode ver quais comandos estão disponíveis com o comando "ajuda"`},
        'cep': function(){return `Vi que você deseja saber um endereço a partir de um cep.\nFaz o seguinte, escreve o comando desse jeito: \nCEP 01001000\nTenta aí que vai dar certo`},
        'me lembra de': function(){return `Vi que você deseja criar um lembrete.\nFaz o seguinte, escreve o comando desse jeito: \nguibot me lembra de ###### daqui ## segundos\nTenta aí que vai dar certo\n(Lembrando q só funciona com segundos, minutos e horas)`},
        'jogo': function(){return `Você pode escolher entre essas opções:\nDado\nCara coroa`},
        'piada': function(){return listaPiadas[Math.floor(Math.random() * listaPiadas.length)]},
        'dado': function(){return `Você jogou seu dado. Deu ${Math.floor(Math.random() * 6) + 1}`},
        'cara coroa': function(nome){return `${nome}, escolha ou cara ou coroa. Dessa vez não vou roubar kkkk`},
        'perdi': function(nome){return `${nome}, você perdeu o jogo.\n pt.m.wikipedia.org/wiki/O_Jogo_(jogo_mental)`},
        'bom dia': function(nome){return `Bom dia, ${nome}`},
        'boa tarde': function(nome){return `Boa tarde, ${nome}`},
        'boa noite': function(nome){return `Boa noite, ${nome}`},
        'mano': function(nome){return `Oi ${nome}, eu sou o GuiBot! Agora sua paz acabou toda vez que disser "mano" kkkkkk`},
        'horas': function(){return new Date().toLocaleTimeString()},
        'cara ou coroa': function(nome){return `${nome}, escolha ou cara ou coroa. Dessa vez não vou roubar kkkk`},
        'cara': function(nome){return Math.random() > 0.5? `${nome} deu cara. Você ganhou.`:`${nome} deu coroa. Eu ganhei.`},
        'coroa': function(nome){return Math.random() > 0.5? `${nome} deu cara. Eu ganhei.`:`${nome} deu coroa. Você ganhou.`},
        'oi': function(nome){return `Olá, ${nome}.\nVocê pode ver quais comandos estão disponíveis com o comando "ajuda"\n\nVocê também pode me fazer perguntas ou me pedir coisas - e vou tentar responder.\nPara fazer isso, me mande uma mensagem começando por Guibot.\nEx.:\nGuibot como você está se sentindo hoje?`},
        'bot': function(nome){return `Bot não, GUIBOT`},
        'guibot': function(nome){return `E aí meu chapa`},
        'contagem respostas': function(nome, chat, message){return QuantasRespostas(message)},
        'guibot sai do grupo': function(nome, chat, message,isGroup){isGroup?chat.leave():message.reply(`Esse comando apenas funciona dentro de grupos.`)},
        'guibot entra nesse grupo': function(){return `Vi que você quer que eu entre em um grupo.\nFaz o seguinte, escreve o comando desse jeito: \n\nguibot entra nesse grupo https://chat.whatsapp.com/blablabla\n\nTenta aí que vai dar certo`},
    }
}

module.exports = Respostas;