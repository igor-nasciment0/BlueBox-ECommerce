import axios from "axios"

const api = axios.create({
    baseURL: 'http://localhost:5033'
})

export async function buscarAvaliacoes(idProduto) {
    let avaliacoes = await api.get(`/produto/${idProduto}/avaliacao`);

    return avaliacoes.data;
}