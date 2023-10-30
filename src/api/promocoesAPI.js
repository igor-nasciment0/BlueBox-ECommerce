import api from "./apiURL.js";

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