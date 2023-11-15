import api from "./apiURL";

export async function buscarEndereco(idEndereco) {
    let r = await api.get(`/endereco/${idEndereco}`);

    return r.data;
}

export async function inserirEndereco(cep, estado, cidade, bairro, logradouro, numero) {
    let endereco = {
        cep: cep,
        estado: estado,
        cidade: cidade,
        bairro: bairro,
        logradouro: logradouro,
        numero: numero
    }

    let r = await api.post('/endereco', endereco);

    return r.data;
}

export async function mudarEndereco(idCliente, idEndereco) {
    let r = await api.put('/endereco', {idCliente: idCliente, idNovoEndereco: idEndereco});

    return r;
}