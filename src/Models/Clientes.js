/**
 * Modelos de dados para construção das coleções("tabelas")
 * Clientes
 */

// importação dos recursos do framework mongoose
const {model, Schema} = require('mongoose')
const { type } = require('os')

// Criação da estrutura da coleção clientes
const clienteSchema = new Schema({
    nomeCliente: {
        type: String
    },
    foneCliente: {
        type: String
    },
    cpf: {
        type: String,
        unique: true,
        index: true
    },
    dataCadastro: {
        type: Date,
        default: Date.now
    }
}, {versionKey: false}) //não versionar os dados armazenados

// exportar para o main o modelo de dados
// OBS: clientes será o nome da coleção 

module.exports = model('Clientes',clienteSchema)