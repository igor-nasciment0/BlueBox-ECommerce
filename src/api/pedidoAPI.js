import api from './apiURL';
import { buscarImagemPrimaria } from './produtoAPI';

export async function buscarPedidoPorEstado(idEstado) {
    let r = await api.get(`/pedido/estado/${idEstado}`);

    return r.data;
}

export async function buscarPedidoPorID(idPedido) {
    let r = await api.get(`/pedido/${idPedido}`);

    return r.data;
}

export async function buscarPedidoPorCliente(idCliente) {
    let r = await api.get(`/pedido/cliente/${idCliente}`);

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

export async function buscarProdutosArrayPedidos(pedidos) {
    let arrayProdutosPedidos = [];

    for(let i = 0; i < pedidos.length; i++) {
        let pedido = pedidos[i];

        let produtos = await buscarProdutosPedido(pedido.id);

        for(let j = 0; j < produtos.length; j++) {
            let produto = produtos[j];

            produto.infoPedido = pedido;
            let imagem = await buscarImagemPrimaria(produto.idProduto);

            produto.imagem = imagem.url;
        }

        arrayProdutosPedidos.push(produtos[0]);
    }

    console.log(arrayProdutosPedidos);

    return arrayProdutosPedidos;
}

/* export function separarPedidosPorMeses(produtosPedidos) {
    let arrayMeses = [{
        mes: new Date(produtosPedidos[0].infoPedido.dataCompra).getMonth() + 1,
        ano: new Date(produtosPedidos[0].infoPedido.dataCompra).getF() + 1
    }];



    for(let i = 1; i < produtosPedidos.length; i++) {
        let produtoAtual = produtosPedidos[i];


    }
} */