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
        //tratamento personalizado dos erros(exceções)
        if (error.code = 11000) {
            console.log(`Erro: O CPF ${cpfCli} já está cadastrado`)
        } else {
            console.log(error)
        }
    }
}

// Função para listar todos os clientes
// .sort({ nomeCliente: 1 }) Listar em ordem alfabética (nome)
const listarClientes = async () => {
    try {
        const clientes = await clienteModel.find().sort({ nomeCliente: 1 })
        console.log(clientes)
    } catch (error) {
        console.log(error)
    }
}

// Função para buscar um cliente pelo nome
// find({nomeCliente: new RegExp(nome, i)}) ignorar na busca letras maíusculas ou minúsculas (i - case insensitive) 
const buscarClienteNome = async (nome) => {
    try {
        const clienteNome = await clienteModel.find(
            {
                nomeCliente: new RegExp(nome, 'i')
            }
        )
        console.log(clienteNome)
    } catch (error) {
        console.log(error)
    }
}


// Função para buscar um cliente pelo CPF
const buscarClienteCPF = async (cpf) => {
    try {
        const ClienteCPF = await clienteModel.find(
            {
                cpf: new RegExp(cpf)
            }
        )
        console.log(ClienteCPF)
    } catch (error) {
        console.log(error)
    }
}

// Função para editar os dados do cliente
// Atenção!! Usar o id do cliente
const atualizarCliente = async (id, nomeCli, foneCli, cpfCli) => {
    try {
        const clienteEditado = await clienteModel.findByIdAndUpdate(id,{
            nomeCliente: nomeCli,
            foneCliente: foneCli,
            cpf: cpfCli
        },
        {
            new: true,
            runValidators: true
        }
    )
    console.log("Dados do cliente alterados com sucesso")
    } catch (error) {
        if (error.code = 11000) {
            console.log(`Erro: O CPF ${cpfCli} já está cadastrado`)
        } else {
            console.log(error)
        }
    }
}


// Função para excluir o cliente
// Atenção!! Usar o id do cliente
const excluirCliente = async (id) => {
    try {
        const clienteDeletado = await clienteModel.findByIdAndDelete(id)
        console.log("Cliente excluido com sucesso")
    } catch (error) {
        console.log(error)
    }
}

//========================================================
//========================================================
const iniciarSistema = async () => {
    console.clear()
    console.log("Estudo do MongoDB")
    console.log("-------------------------------------")
    await conectar()
    // CRUD Create (inserção no banco de dados)
    //await salvarCliente("Leandro Ramos", "99999-4321", "12345678905")

    // CRUD Read (listar todos os clientes)
    //await listarClientes()

    // CRUD Read (busca pelo nome do cliente)
    //await buscarClienteNome("Arthur")

    //CRUD Read (busca pelo cpf do cliente)
    //await buscarClienteCPF("366336736782")

    // CRUD update (id do cliente)
    //await atualizarCliente("67dafb1a8c9f9ba48572c35b", "Diogo", "(11)9346-86387", "763983342782")

    // CRUD Delete
    await excluirCliente("67daf80d64682ca28847afce")
    await desconectar()
}

 iniciarSistema()