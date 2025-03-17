/**
 * Processo principal
 * Estudos do banco de dados MongoDB (CRUD)
 * @author Arthur Cruz
 */

// importação do módulo de conexão 
const { conectar, desconectar } = require('./database.js')

// importação do modelo de dados do cliente
const clienteModel = require('./src/Models/Clientes.js')

// função para cadastrar um novo cliente
const salvarCliente = async (nomeCli, foneCli, cpfCli) => {
    try {
        // setar a estrutura de dados com os valores
        // OBS: Usar os mesmo nomes da estrutura
        const novoCliente = new clienteModel({
            nomeCliente: nomeCli,
            foneCliente: foneCli,
            cpf: cpfCli
        })
        // a linha abaixo salva os dados no banco de dados
        await novoCliente.save()
        console.log("Cliente adicionado com sucesso")
    } catch(error) {
        console.log(error)
    }
}

 //=======================================================
 const iniciarSistema = async () => {
    console.clear()
    console.log("Estudo do MongoDB")
    console.log("-------------------------------")
    await conectar()
    // CRUD Create (inserção no banco de dados)
    await salvarCliente("arthur", "9999-9999", "12345678900")
    await salvarCliente("Neymar", "9999-9999", "12345678900")
    await desconectar()
 }

 iniciarSistema()