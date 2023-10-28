import api from "./apiURL.js";

export async function loginAdm(email, senha) {
    let login = {
        email: email,
        senha: senha
    }

    let resp = await api.post('/adm/login', login);

    return resp;
}