const mongoose = require('mongoose');

const schema = mongoose.Schema;

const usuarios = new schema({
    id: { type: Number, require: true },
    nome: { type: String, require: true },
    telefone: { type: String, require: true },
    nascimento: { type: String, require: true },
    genero: { type: String, require: true },
    cpf_cnpj: { type: String, require: true },
    necessidades: { type: String, require: true },
    endereco: { type: String, require: true },
    nro_logradouro: { type: String, require: true },
    bairro: { type: String, require: true },
    cidade: { type: String, require: true },
    uf: { type: String, require: true },
    cep: { type: String, require: true },
    experiencia: { type: String, require: true },
    tel_experiencia: { type: String }, //opcional
    dataadm: { type: String, require: true },
    cargoinicial: { type: String, require: true },
    datasaida: { type: String, require: true },
    cargofinal: { type: String, require: true },
    ultimosalario: { type: String }, //opcional
    motivosaida: { type: String }, //opcional
    descricao_cv: { type: String }, //opcional
    contatos_cv: { type: String, require: true },
    linguagem_cv: { type: String }, //opcional
    hobby_cv: { type: String }, //opcional
    educacao_cv: { type: String, require: true },
    skills_cv: { type: String }, //opcional
});

const Usuarios = mongoose.model('usuarios', usuarios);

module.exports = { Usuarios };