import api from "./apiURL";

export async function adicionarCupom(codigo, percentDesconto, expiracao) {
    let cupom = {
        codigo: codigo,
        percentDesconto: Number(percentDesconto),
        expiracao: expiracao
    }
    
    let cupomAdicionado = await api.post(`/cupom`, cupom);

    return cupomAdicionado.data;
}

export async function adicionarProdutosCupom(produtos, idCupom) {
    for(let i = 0; i < produtos.length; i++) {
        let produto = produtos[i];

        await api.post('/cupom/produto', {idCupom: idCupom, idProduto: produto.id});
    }
}

export async function verificarCupom(codigo, idProduto) {
    let r = await api.get(`/cupom?codigo=${codigo}&idProduto=${idProduto}`);

    return r.data;
}