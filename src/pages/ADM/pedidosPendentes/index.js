import { useContext, useEffect, useState } from 'react';
import BarraLateral from '../../../components/ADM/barraLateral';
import CabecalhoADM from '../../../components/ADM/cabecalho';
import './index.scss';
import { TemaContext } from '../../../theme';
import { avancarEstadoPedido, buscarPedidoPorEstado, buscarProdutosPedido } from '../../../api/pedidoAPI';
import ToastCont from '../../../components/toastContainer';
import { toast } from 'react-toastify';
import { formatarData } from '../../../api/funcoesGerais';

export default function PedidoPendente() {

    const context = useContext(TemaContext);
    let tema = context.tema;

    const [aprovacao, setAprovacao] = useState([]);
    const [preparo, setPreparo] = useState([]);
    const [emEntrega, setEmEntrega] = useState([]);

    async function buscarPedidos() {
        try {
            let aprov = await buscarPedidoPorEstado('1');
            let emPreparo = await buscarPedidoPorEstado('2');
            let aCaminho = await buscarPedidoPorEstado('3');

            setAprovacao(aprov);
            setPreparo(emPreparo);
            setEmEntrega(aCaminho);

        } catch (error) {
            console.log(error);
            if (error.message) {
                toast.error(error.message)
            } else {
                toast.error('Não foi possível carregar os pedidos.')
            }
        }
    }

    async function buscarProdutos(pedido) {
        try {
            let produtos = await buscarProdutosPedido(pedido.id);

            pedido.produtos = produtos;

        } catch (error) {
            console.log(error);
        }
    }

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

    useEffect(() => {
        buscarPedidos();
    }, []);

    useEffect(() => {
        aprovacao.forEach(pedido => buscarProdutos(pedido));
        preparo.forEach(pedido => buscarProdutos(pedido));
        emEntrega.forEach(pedido => buscarProdutos(pedido));
    }, [aprovacao, preparo, emEntrega]);

    return (
        <div className={'pagina-pedido-pendente ' + tema}>
            <CabecalhoADM />

            <div className='main'>
                <BarraLateral />
                <ToastCont />

                <div className='pedidos'>
                    <h1>Pedidos Pendentes</h1>

                    <p>Aguardando Aprovação</p>
                    <div className='aprovacao'>
                        <div className='pedido'>
                            <div>
                                <p>4 Produtos</p>
                            </div>
                            <div>
                                <h6>Comprador</h6>
                                <p>Carlos H. da Silva Pinto</p>
                            </div>
                            <div>
                                <h6>Data de Pagamento</h6>
                                <p>29/09/2023</p>
                            </div>
                            <div>
                                <h6>Método</h6>
                                <p>Crédito</p>
                            </div>
                            <img src="/assets/images/icons/adm/BotãoOlhar.svg" />
                            <button>Aprovar</button>
                        </div>

                        {aprovacao.map(pedido =>
                            <div className='pedido'>
                                <div>
                                    <p>{pedido.produtos.length} Produtos</p>
                                </div>
                                <div>
                                    <h6>Comprador</h6>
                                    <p>{pedido.nomeCliente + ' ' + pedido.sobreNomeCliente}</p>
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
                        )}
                    </div>

                    <p>Em Preparo</p>
                    <div className='preparo'>
                        <div className='pedido'>
                            <div>
                                <p>4 Produtos</p>
                            </div>
                            <div>
                                <h6>Comprador</h6>
                                <p>Carlos H. da Silva Pinto</p>
                            </div>
                            <div>
                                <h6>Aprovação do Pgt.</h6>
                                <p>12/12/2023</p>
                            </div>
                            <img src="/assets/images/icons/adm/BotãoOlhar.svg" />
                            <button>Pronto</button>
                        </div>

                        {preparo.map(pedido =>
                            <div className='pedido'>
                                <div>
                                    <p>{pedido.produtos.length} Produtos</p>
                                </div>
                                <div>
                                    <h6>Comprador</h6>
                                    <p>{pedido.nomeCliente + ' ' + pedido.sobreNomeCliente}</p>
                                </div>
                                <div>
                                    <h6>Aprovação do Pgt.</h6>
                                    <p>{formatarData(pedido.dataAprovacao)}</p>
                                </div>
                                <img src="/assets/images/icons/adm/BotãoOlhar.svg" alt='Ver detalhes' />
                                <button onClick={() => avancarEstado(pedido)}>Pronto</button>
                            </div>
                        )}
                    </div>

                    <p>A Caminho</p>
                    <div className='caminho'>
                        <div className='pedido'>
                            <div>
                                <p>4 Produtos</p>
                            </div>
                            <div>
                                <h6>Comprador</h6>
                                <p>Carlos H. da Silva Pinto</p>
                            </div>
                            <div>
                                <h6>Saiu Para Entrega</h6>
                                <p>12/12/2023</p>
                            </div>
                            <img src="/assets/images/icons/adm/BotãoOlhar.svg" />
                            <button >Concluir <br/> pedido</button>
                        </div>

                        {emEntrega.map(pedido =>
                            <div className='pedido'>
                                <div>
                                    <p>{pedido.produtos.length} Produtos</p>
                                </div>
                                <div>
                                    <h6>Comprador</h6>
                                    <p>{pedido.nomeCliente + ' ' + pedido.sobreNomeCliente}</p>
                                </div>
                                <div>
                                    <h6>Saiu Para Entrega</h6>
                                    <p>{formatarData(pedido.dataSaida)}</p>
                                </div>
                                <img src="/assets/images/icons/adm/BotãoOlhar.svg" alt='Ver detalhes'/>
                                <button onClick={() => avancarEstado(pedido)}>Concluir <br/> pedido</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}