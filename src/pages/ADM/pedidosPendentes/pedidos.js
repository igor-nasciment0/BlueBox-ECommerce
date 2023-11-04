import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { avancarEstadoPedido, buscarProdutosPedido } from "../../../api/pedidoAPI";
import { formatarData } from "../../../api/funcoesGerais";

async function avancarEstado(pedido) {
    try {
        await avancarEstadoPedido(pedido.idEstado, pedido.id);

        toast.success('Sucesso!')

        setTimeout(() => window.location.reload(), 3000);
        
    } catch (error) {
        if(error.response) 
            toast.error(error.response.data)
        else
            toast.error(error.message)
    }
}

export function PedidoAguardando({ pedido }) {

    const [produtos, setProdutos] = useState([]);

    async function buscarProdutos() {
        try {

            let produtos = await buscarProdutosPedido(pedido.id);

            setProdutos(produtos);

        } catch (error) {
            console.log(error);
            toast.error('Não foi possível carregar um ou mais pedidos corretamente.')
        }
    }

    useEffect(() => {
        buscarProdutos();
    }, [pedido])

    return (
        <div className='pedido'>
            <div>
                <p>{produtos.length} Produtos</p>
            </div>
            <div>
                <h6>Comprador</h6>
                <p>{pedido.nomeCliente + ' ' + pedido.sobrenomeCliente}</p>
            </div>
            <div>
                <h6>Data de Pagamento</h6>
                <p>{formatarData(pedido.dataCompra)}</p>
            </div>
            <div>
                <h6>Método</h6>
                <p>{pedido.tipoPagamento}</p>
            </div>
            <img src="/assets/images/icons/adm/BotãoOlhar.svg" alt='Ver detalhes' />
            <button onClick={() => avancarEstado(pedido)}>Aprovar</button>
        </div>
    )
}

export function PedidoPreparo({ pedido }) {
    const [produtos, setProdutos] = useState([]);

    async function buscarProdutos() {
        try {

            let produtos = await buscarProdutosPedido(pedido.id);

            setProdutos(produtos);

        } catch (error) {
            console.log(error);
            toast.error('Não foi possível carregar um ou mais pedidos corretamente.')
        }
    }

    useEffect(() => {
        buscarProdutos();
    }, [pedido])

    return (
        <div className='pedido'>
            <div>
                <p>{produtos.length} Produtos</p>
            </div>
            <div>
                <h6>Comprador</h6>
                <p>{pedido.nomeCliente + ' ' + pedido.sobrenomeCliente}</p>
            </div>
            <div>
                <h6>Aprovação do Pgt.</h6>
                <p>{formatarData(pedido.dataAprovacao)}</p>
            </div>
            <img src="/assets/images/icons/adm/BotãoOlhar.svg" alt='Ver detalhes' />
            <button onClick={() => avancarEstado(pedido)}>Pronto</button>
        </div>
    )
}

export function PedidoCaminho({ pedido }) {
    const [produtos, setProdutos] = useState([]);

    async function buscarProdutos() {
        try {

            let produtos = await buscarProdutosPedido(pedido.id);

            setProdutos(produtos);

        } catch (error) {
            console.log(error);
            toast.error('Não foi possível carregar um ou mais pedidos corretamente.')
        }
    }

    useEffect(() => {
        buscarProdutos();
    }, [pedido])

    return (
        <div className='pedido'>
            <div>
                <p>{produtos.length} Produtos</p>
            </div>
            <div>
                <h6>Comprador</h6>
                <p>{pedido.nomeCliente + ' ' + pedido.sobrenomeCliente}</p>
            </div>
            <div>
                <h6>Saiu Para Entrega</h6>
                <p>{formatarData(pedido.dataSaida)}</p>
            </div>
            <img src="/assets/images/icons/adm/BotãoOlhar.svg" alt='Ver detalhes' />
            <button onClick={() => avancarEstado(pedido)}>Concluir <br /> pedido</button>
        </div>
    )
}