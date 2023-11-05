const qrcode = require('qrcode-terminal');
const { Client, GroupChat, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const Respostas = require('./respostas');
const Reactions = require('./reactions');
const {ContagemRespostas, QuantasRespostas} = require('./contagemRespostas');
const Lembrete = require('./lembrete');
const ChatBot = require('./chatBot');
require('dotenv').config();
//const AudioParaTexto = require('./audioParaTexto');
//const Zoom = require('./zoom')
//const TextoParaAudio = require('./textoParaAudio');
const fs = require('fs');

// //SERVER
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.get('/health', (req, res) => {
  res.send('Guibot funcionando');
});

app.listen(port, () => {
    console.log(`Guibot listening on port ${port}`);
});

const client = new Client({
    authStrategy: new LocalAuth(),
    ppuppeteer: { 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
    //ffmpegPath: "D:/TI/ffmpeg/bin",
});

const responderMensagens = Respostas();

let dataInicio = new Date();

const figurinha = async (chat, message, type) => {
    //console.log(message);
    try {
        const mediaInfo = await message.downloadMedia();
        const data = mediaInfo.data;

        if(type == "image"){
            const image = await new MessageMedia("image/jpeg", data, "image.jpg");
            await chat.sendMessage(image, { sendMediaAsSticker: true , stickerAuthor:"GuiBot 🤖", stickerCategories:"GuiBot 🤖", stickerName:"GuiBot"});
        }else {
            const gif = await new MessageMedia("video/mp4", data, "gif.mp4");
            await chat.sendMessage(gif, { sendMediaAsSticker: true , stickerAuthor:"GuiBot 🤖", stickerCategories:"GuiBot 🤖", stickerName:"GuiBot"});
        }
        
    } catch(e) {
        message.reply("❌ Erro ao processar imagem"+e.toString());
    }
}

function getEndereco(cep, mensagem){
    console.log(cep);

    async function getCep(cep){
        const options = {method: 'GET'};
        const rawResponse = await fetch(`https://viacep.com.br/ws/${cep}/json/`, options)
        const response = await rawResponse.json();
        
        return response;
    }

    if(cep.length == 8 && typeof(cep*1 == "number")){
        ContagemRespostas();
        getCep(cep).then((resposta)=>mensagem.reply(`${resposta.logradouro}, ${resposta.bairro}, ${resposta.localidade}`));
    }else{
        ContagemRespostas();
        mensagem.reply("O cep deve conter apenas 8 números");
    }
}
 
client.initialize();
 
client.on('qr', (qr) => {
    console.log("QR CODE RECEIVED", qr);
    qrcode.generate(qr, {small: true});
});
 
client.on('authenticated', () => {
    console.log('Authenticated');
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message',async message => {
    let contato = await message.getContact();
    let nome = contato.name || message.author;
    let dataHoje = new Date();
    let horario = dataHoje.getHours() + ":" + dataHoje.getMinutes()
    let textoMensagem = message.body.toLowerCase();
    let listaComandos = "Esses são os meus comandos: \n" + Object.keys(responderMensagens).toString().replaceAll(',', '\n');
    const chat = await message.getChat();
//GROUP
    //if((await message.getChat()).isGroup){
        //console.log("GRUPO")
        
        Reactions(message);

        if(textoMensagem === 'ajuda' || textoMensagem === 'help' || textoMensagem === 'comandos') {

            console.log(horario + " - " + nome + " disse: ", textoMensagem);
            message.reply(listaComandos);
            ContagemRespostas();

        }else if(message.hasMedia){
            const media = await message.downloadMedia();
            //console.log("MIDIA", message);
            try {
                if(media.hasOwnProperty("mimetype") && media.mimetype == "audio/ogg; codecs=opus"){
                    // is a voice message
                    message.react("🎧");
                    //AudioParaTexto(media, message);
                }
                else if(textoMensagem == 'figurinha'){
                    // is an image
                    await figurinha(chat, message, message.type);
                    console.log(horario + " - " + nome + " disse: ", textoMensagem);
                    ContagemRespostas();
                }
            } catch (error) {
                message.reply(error)
            }
        
        }else if(textoMensagem == 'figurinha'){
            let oldMsg = await message.getQuotedMessage();
            //console.log(oldMsg);
            //console.log("AAAAAAAAAAAAAAAAAAAAAAAA",Object.keys(oldMsg));
            if(message.hasQuotedMsg){
                await figurinha(chat, oldMsg, oldMsg.type);
                console.log(horario + " - " + nome + " disse: ", textoMensagem);
                ContagemRespostas();
                //console.log("UHUUUUU");
            }
            //await figurinha(chat, message);
        }/*else if(textoMensagem == "zoom"){
            let deltaTime = parseInt((new Date().getTime() - dataInicio.getTime())/1000);
            if(deltaTime < 150){
                message.reply('Esse comando já foi utilizado nos últimos 2 minutos, por favor aguarde um pouco mais antes de usar novamente.')
            }else{
                dataInicio = new Date();
                Zoom(message);
            }
        }*/else if(textoMensagem.includes("cep")){

            console.log(horario + " - " + nome + " disse: ", textoMensagem);
            if(textoMensagem.length > 4 && textoMensagem.length < 13 ){
                getEndereco(textoMensagem.split('cep ')[1], message);
            } else if(textoMensagem == "cep"){
                message.reply(responderMensagens[textoMensagem](nome));
                ContagemRespostas();
            }

        }else if(textoMensagem.includes("audio ") || textoMensagem.includes("áudio ")){
            if(textoMensagem.indexOf("audio ") == 0 || textoMensagem.indexOf("áudio ") == 0 && textoMensagem.length > 6){
                let text = textoMensagem.includes("audio ")?textoMensagem.split("audio ")[1]:textoMensagem.split("áudio ")[1];
                message.react("🗣️");
                //TextoParaAudio(text, message);
                ContagemRespostas();
            }


        }else if(textoMensagem.includes("vou ver")){
            message.reply("iiiiiii olha a desculpinha");
            console.log(horario + " - " + nome + " disse: ", textoMensagem);
            ContagemRespostas();
        }else if(textoMensagem.includes("repete")){
            message.reply(textoMensagem.split("repete ")[1]);
            console.log(horario + " - " + nome + " disse: ", textoMensagem);
            ContagemRespostas();
        }else if((await message.getChat()).isGroup && textoMensagem == "@todos"){

            console.log(horario + " - " + nome + " disse: ", textoMensagem);
            ContagemRespostas();
            //const chat = await message.getChat();

            let text = "";
            let mentions = [];
    
            for(let participant of chat.participants) {
                const contact = await client.getContactById(participant.id._serialized);

                mentions.push(contact);
                text += `@${participant.id.user} `;
            }
    
            await chat.sendMessage(text, { mentions });
            
        }else if(textoMensagem.includes("guibot me lembra de ") || textoMensagem.includes("guibot me lembre de ")){
            if(textoMensagem.includes("daqui ") && textoMensagem.includes("segundos") || textoMensagem.includes("minutos") || textoMensagem.includes("minuto") || textoMensagem.includes("horas") || textoMensagem.includes("hora")){
                try {
                    console.log(horario + " - " + nome + " disse: ", textoMensagem);
                    ContagemRespostas();
                    
                    let flagLembra = textoMensagem.includes("lembra")?true:false;
                    let flagSegundos = textoMensagem.includes("segundos")?true:false;
                    let flagMinutos = textoMensagem.includes("minutos")?true:false;
                    let flagMinuto = textoMensagem.includes("minuto")?true:false;
                    let flagHoras = textoMensagem.includes("horas")?true:false;
                    let flagHora = textoMensagem.includes("hora")?true:false;
                    let temp = textoMensagem.split(flagLembra?"guibot me lembra de ":"guibot me lembre de ")[1];
                    let texto = temp.split(" daqui ")[0];
                    let tempo = 0;
                    

                    if(flagSegundos){
                        temp = textoMensagem.split("daqui ")[1];
                        tempo = temp.split(" segundos")[0];
                        Lembrete(message, texto, parseInt(tempo));
                    }else if(flagMinutos){
                        temp = textoMensagem.split("daqui ")[1];
                        tempo = temp.split(" minutos")[0];
                        Lembrete(message, texto, parseInt(tempo)*60);
                    }else if(flagMinuto){
                        temp = textoMensagem.split("daqui ")[1];
                        tempo = temp.split(" minuto")[0];
                        Lembrete(message, texto, parseInt(tempo)*60);
                    }else if(flagHoras){
                        temp = textoMensagem.split("daqui ")[1];
                        tempo = temp.split(" horas")[0];
                        Lembrete(message, texto, parseInt(tempo)*60*60);
                    }else if(flagHora){
                        temp = textoMensagem.split("daqui ")[1];
                        tempo = temp.split(" hora")[0];
                        Lembrete(message, texto, parseInt(tempo)*60*60);
                    }
                    
                } catch (error) {
                    message.reply("Ops, acho que o comando foi errado");
                    console.log(horario + " - " + nome + " disse: ", textoMensagem);
                    ContagemRespostas();
                }
            }
        }else{
            //const chat = await message.getChat();

            if(responderMensagens.hasOwnProperty(textoMensagem)){
                message.reply(responderMensagens[textoMensagem](nome, chat, message, await chat.isGroup));
                console.log(horario + " - " + nome + " disse: ", textoMensagem);
                ContagemRespostas();
            }

        }
        if(((textoMensagem.includes("guibot ") || textoMensagem.includes("guibot, ")) && (textoMensagem.indexOf("guibot ") == 0 || textoMensagem.indexOf("guibot, ") == 0 )) && (textoMensagem != "guibot sai do grupo" && textoMensagem.includes("guibot entra nesse grupo") == false)){
            let msg = textoMensagem.includes("guibot ")?textoMensagem.split("guibot ")[1]:textoMensagem.split("guibot, ")[1];
            
            console.log(horario + " - " + nome + " disse: ", textoMensagem);
            if((await message.getChat()).name != "GUIBOT"){
                ChatBot(message, msg);
            }
            ContagemRespostas();
        }

        //aceita convites de grupo
        //console.log(textoMensagem);
        //console.log(message.description);
        if(textoMensagem.includes(' https') && textoMensagem.split(' https')[0] == "guibot entra nesse grupo"){
            try {
                let idGrupo = message.body.split('https://chat.whatsapp.com/')[1];
                console.log(idGrupo);
                await client.acceptInvite(idGrupo); 
                message.reply('Entrei no grupo!'); 
                ContagemRespostas();
            } catch (e) {
                message.reply('Esse convite parece ser inválido.');
                ContagemRespostas();
            }
        };
    //}
    
});
















