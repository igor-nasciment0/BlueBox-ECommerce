import api from './apiURL';

export async function buscarPedidoPorEstado(idEstado) {
    let r = await api.get(`/pedido/estado/${idEstado}`);

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