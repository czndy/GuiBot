const fs = require('fs');

const ContagemRespostas = ()=>{
    // Lê o conteúdo do arquivo
    fs.readFile('contagemRespostas.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
    
        // Converte o conteúdo para número
        let count = parseInt(data, 10);
    
        // Adiciona 1 à contagem
        count += 1;
        
        if(typeof(count) == "number"){
            // Escreve a nova contagem no arquivo
            fs.writeFile('contagemRespostas.txt', count.toString(), (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                //console.log('Contagem atualizada com sucesso!');
            });
        }else{
            console.log("Erro ao atualizar contagem")
        }
    });
}

const QuantasRespostas = (message) => {

    fs.readFile('contagemRespostas.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        message.reply(`Eu já respondi ${data} mensagens`);
    });
}

module.exports = {ContagemRespostas, QuantasRespostas};