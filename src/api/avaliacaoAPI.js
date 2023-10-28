import api from "./API_URL.js";

export async function buscarAvaliacoes(idProduto) {
    let avaliacoes = await api.get(`/produto/${idProduto}/avaliacao`);

    return avaliacoes.data;
}

export async function postarAvaliacao(idProduto, idCliente, comentario, nota) {
    let avaliacao = {
        idCliente: idCliente,
        comentario: comentario,
        nota: nota
    }

    let r = await api.post(`/produto/${idProduto}/avaliacao`, avaliacao);

    return r.data;
}

export async function deletarAvaliacao(idAvaliacao) {
    let r = await api.delete(`/produto/avaliacao/${idAvaliacao}`);

    return r.data;
}

export async function verificarLike(idCliente, idAvaliacao) {
    let r = await api.get(`/produto/avaliacao/${idAvaliacao}/like?cliente=${idCliente}`);

    return r.data;
}

export async function darLike(idCliente, idAvaliacao) {
    let r = await api.post(`/produto/avaliacao/${idAvaliacao}/like?cliente=${idCliente}`);

    return r;
}

export async function tirarLike(idCliente, idAvaliacao) {
    let r = await api.delete(`/produto/avaliacao/${idAvaliacao}/like?cliente=${idCliente}`);

    return r;
}

export async function verificarNumeroLikes(idAvaliacao) {
    let r = await api.get(`/produto/avaliacao/${idAvaliacao}/numerolikes`);

    return r.data;
}