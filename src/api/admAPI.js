import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5033'
})

export async function loginAdm(email, senha) {
    let login = {
        email: email,
        senha: senha
    }

    let resp = await api.post('/adm/login', login);

    return resp[0];
}