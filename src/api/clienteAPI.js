import axios from 'axios';

let api = axios.create({
    baseURL: 'http://localhost:5033'
})

export async function cadastroCliente(nome, sobrenome, email, senha, telefone, cpf, dataNascimento) {
    let credenciais = {
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        senha: senha,
        telefone: telefone,
        cpf: cpf,
        dataNascimento: dataNascimento
    }

    let resp = await api.post('/usuario/cadastro', credenciais);

    return resp;
}

export async function loginCliente(email, senha) {
    let credenciais = {
        email: email,
        senha: senha
    }
  
    let resp = await api.post('/usuario/login', credenciais);

    return resp;
}