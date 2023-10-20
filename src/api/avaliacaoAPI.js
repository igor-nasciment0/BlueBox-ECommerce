import axios from "axios"

const api = axios.create({
    baseURL: 'http://localhost:5033'
})

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

export async function verificarLike(idCliente, idAvaliacao) {
    let r = await api.get(`/produto/avaliacao/${idAvaliacao}/like`, {idCliente: idCliente});

    return r.data;
}

export async function darLike(idCliente, idAvaliacao) {
    let r = await api.post(`/produto/avaliacao/${idAvaliacao}/like`, {idCliente: idCliente});

    return r.data;
}