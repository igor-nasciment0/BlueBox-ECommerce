import api from "./API_URL.js";

export async function cadastroCliente(nome, sobrenome, email, senha, telefone, cpf, dataNascimento) {
    let credenciais = {
        nome: nome.trim(),
        sobrenome: sobrenome.trim(),
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

export async function trocarFotoPerfil(idCliente, imagem) {
    const formData = new FormData();
    formData.append('imagem', imagem);

    let resp = await api.put(`/usuario/${idCliente}/imagem`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return resp;
}