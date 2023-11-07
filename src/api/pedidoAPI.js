import api from './apiURL';
import { buscarImagemPrimaria, buscarProdutoPorID } from './produtoAPI';

export async function buscarPedidoPorEstado(idEstado) {
    let r = await api.get(`/pedido/estado/${idEstado}`);

    return r.data;
}

export async function buscarPedidoPorID(idPedido) {
    let r = await api.get(`/pedido/${idPedido}`);

    return r.data;
}

export async function buscarProdutosPedido(idPedido) {
    let r = await api.get(`/pedido/${idPedido}/produtos`);

    return r.data;
}

export async function avancarEstadoPedido(idEstado, idPedido) {
    let url;

    switch (idEstado) {
        case 1:
            url = `/pedido/${idPedido}/aprovar`;
            break;
        case 2:
            url = `/pedido/${idPedido}/saiu`;
            break;
        case 3:
            url = `/pedido/${idPedido}/concluir`;
            break;
        default:
            throw new Error('Não foi possível alterar o estado do pedido.')
    }


    let r = await api.put(url);

    return r.data;
}

export async function produtoAtual(idProduto, produtos) {
    let produto;

    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].idProduto == idProduto) {
            produto = produtos[i];
        }
    }

    console.log(produto);
 
    let imagemProduto = await buscarImagemPrimaria(produto.idProduto);

    produto.imagem = imagemProduto.url;

    return produto;
}

export async function outrosProdutos(idProduto, produtos) {
    let outrosProdutos = [];

    for (let i = 0; i < produtos.length; i++) {

        if (produtos[i].idProduto != idProduto) {
            outrosProdutos.push(produtos[i]);
        }
    }

    for (let i = 0; i < outrosProdutos.length; i++) {
        let imagem = await buscarImagemPrimaria(outrosProdutos[i].idProduto);

        outrosProdutos[i].imagem = imagem.url;
    }

    return outrosProdutos;
}

export function calcularPrecoProdutos(produtos) {
    let preco = 0;
    
    for(let i = 0; i < produtos.length; i++) {
        let produto = produtos[i];

        preco += produto.precoProduto * produto.quantidade;
    }

    return preco;
}