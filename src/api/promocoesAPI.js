import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5033'
});

export async function alternarPromocao(btPromo, idProduto) {
    let resp = await api.put(`/promocao/${idProduto}?promocao=${btPromo}`);

    return resp;
}

export async function alterarValorPromocional(novoValor, idProduto) {
    let resp = await api.put(`/promocao/valor/${idProduto}`, {
        valorPromocional: novoValor
    });

    return resp;
}