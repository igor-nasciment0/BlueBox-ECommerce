import axios from "axios";

import {api} from './API_URL'; 

export async function loginAdm(email, senha) {
    let login = {
        email: email,
        senha: senha
    }

    let resp = await api.post('/adm/login', login);

    return resp;
}