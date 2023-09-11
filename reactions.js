const Reactions = (message) => {

    let textoMensagem = message.body.toLowerCase();

    //reage com emotes nas mensagens
    if(textoMensagem.includes("odeio") || textoMensagem.includes("lixo")){
        message.react("😡");
    }else if(textoMensagem.includes("cocô") || textoMensagem.includes("merda") || textoMensagem.includes("bosta") || textoMensagem.includes("fezes") || textoMensagem.includes("💩")){
        message.react("💩");
    }else if(textoMensagem == "guibot sai do grupo"){
        message.react("😭");
    }else if(textoMensagem.includes("docker")){
        message.react("🐋");
    }else if(textoMensagem.includes("figurinha")){
        message.react("🖼️");
    }
}

module.exports = Reactions;