const express = require('express'); //importa o express

const app = express(); //app recebe a função express
const PORT = 3000; //porta que o servidor irá rodar

app.listen(PORT, () => { console.log("Servidor Rodando") }); //comando que inicia o servidor

module.exports = app; //exportar o servidor