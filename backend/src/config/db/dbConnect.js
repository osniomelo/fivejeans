const mongoose = require('mongoose'); //importa o mongoose 
mongoose.Promise = global.Promise; //transfere a promisse global para promisse do mongodb

const URL = 'mongodb://localhost:27017/fivejeans'; //informa a url do banco

module.exports = mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }); //faz a conexão importa ela
