import { useContext, useEffect, useState } from 'react';
import BarraLateral from '../../../components/ADM/barraLateral';
import CabecalhoADM from '../../../components/ADM/cabecalho';
import './index.scss';
import { TemaContext } from '../../../theme';
import { buscarPedidoPorEstado, buscarPedidoPorID } from '../../../api/pedidoAPI';
import ToastCont from '../../../components/toastContainer';
import { toast } from 'react-toastify';
import { PedidoAguardando, PedidoCaminho, PedidoPreparo } from './pedidos';
import { buscarEndereco } from '../../../api/enderecoAPI';
import { formatarData, valorEmReais } from '../../../api/funcoesGerais';

export default function PedidoPendente() {

    const context = useContext(TemaContext);
    let tema = context.tema;

    const [aprovacao, setAprovacao] = useState([]);
    const [preparo, setPreparo] = useState([]);
    const [emEntrega, setEmEntrega] = useState([]);

    const [detalhes, setDetalhes] = useState(false);

    const [idPedidoInfo, setIdPedidoInfo] = useState();
    const [endereco, setEndereco] = useState({});
    const [infoPedido, setInfoPedido] = useState({});
    const [listaProdutos, setListaProdutos] = useState([]);

    async function buscarInfo() {
        try {
          let info = await buscarPedidoPorID(idPedidoInfo)
          setInfoPedido(info); 

          let endrc = await buscarEndereco(info.id_endereco);
          setEndereco(endrc);

          console.log(info);

          setListaProdutos(info.produtos);
    
        } catch (error) {
          console.log(error);
        }
      }

    async function buscarPedidos() {
        try {
            let aprov = await buscarPedidoPorEstado('1');
            let emPreparo = await buscarPedidoPorEstado('2');
            let aCaminho = await buscarPedidoPorEstado('3');

            aprov.forEach(pedido => pedido.produtos = []);
            emPreparo.forEach(pedido => pedido.produtos = []);
            aCaminho.forEach(pedido => pedido.produtos = []);

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

    function mostrarDetalhes(idPedido) {
        setDetalhes(true);
        setIdPedidoInfo(idPedido);
    }

    useEffect(() => {
        buscarPedidos();
    }, []);

    useEffect(() => {
        buscarInfo();
    }, [idPedidoInfo])

    return (
        <div className={'pagina-pedido-pendente ' + tema}>
            <CabecalhoADM />

            <div className='main'>
                <BarraLateral />
                <ToastCont />

                <div className='produtoDesc' style={{display: detalhes ? 'flex' : 'none'}}>
                    <h4 className='sair' onClick={() => setDetalhes(false)}>Sair</h4>
                    
                    <div className='produto'>
                        <h2>Produto</h2>

                        {listaProdutos.map(produto => 
                         <div>
                            <div className='alinhamentoNome'>
                                <h6>Nome</h6>
                                <div  className='nome'>
                                    <p>{produto.nomeProduto}</p>
                                </div>
                            </div>

                            <div>
                                <h6>Qtd.</h6>
                                <div>
                                    <p>{produto.quantidade}</p>
                                </div>
                            </div>

                            <div>
                                <h6>Valor Unitário</h6>
                                <div>
                                    <p>{valorEmReais(produto.precoProduto)}</p>
                                </div>
                            </div>

                        </div>    
                        )}
                       

                    </div>
                    
                    <div className='linhaTempo'>
                        <h2>Linha do Tempo</h2>

                        <div>

                            <div>
                                <h6>Data de Compra</h6>
                                <div>
                                    <p>{formatarData(infoPedido.dataCompra)}</p>
                                </div>
                            </div>

                            <div>
                                <h6>Aprovação do Pgt.</h6>
                                <div>
                                    <p>{formatarData(infoPedido.dataAprovacao)}</p>
                                </div>
                            </div>

                            <div>
                                <h6>Saiu para Entrega</h6>
                                <div>
                                    <p>{formatarData(infoPedido.dataSaida)}</p>
                                </div>
                            </div>

                            <div>
                                <h6>Entregue</h6>
                                <div>
                                    <p>{formatarData(infoPedido.dataEntrega)}</p>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className='entregaPagamento'>

                        <div className='entrega'>

                            <div className='titulo'>
                                <img src="/assets/images/icons/adm/gps.svg" alt="" />
                                <h2>Entrega</h2>
                            </div>

                            <div className='info'>

                                <div>
                                    <h6>Nome da Rua</h6>
                                    <div>
                                        <p>{endereco.logradouro}</p>
                                    </div>
                                </div>

                                <div>
                                    <h6>Cidade</h6>
                                    <div>
                                    <p>{endereco.cidade}</p>
                                    </div>
                                </div>

                                <div>
                                    <h6>Estado</h6>
                                    <div>
                                    <p>{endereco.estado}</p>
                                    </div>
                                </div>

                            </div>

                            <div className='info'>

                                <div>
                                    <h6>CEP</h6>
                                    <div>
                                    <p>{endereco.cep}</p>
                                    </div>
                                </div>

                                <div>
                                    <h6>N° da Casa</h6>
                                    <div>
                                    <p>{endereco.numero}</p>   
                                    </div>
                                </div>

                            </div>

                            <div className='infoLong'>
                                <h6>Nome</h6>
                                <div>
                                    <p>{infoPedido.nomeCliente + ' ' + infoPedido.sobrenomeCliente}</p>
                                </div>
                            </div>

                            <div className='infoLong'>
                                <h6>Número de Telefone</h6>
                                <div>
                                    <p>{infoPedido.telefone}</p>
                                </div>
                            </div>

                            <div className='infoLong'>
                                <h6>N° do Pedido</h6>
                                <div>
                                    <p>{infoPedido.id}</p>
                                </div>
                            </div>


                        </div>
                        
                        <div className='pagamento'>
                            
                            <div className='titulo'>
                                <img src="/assets/images/icons/adm/money.svg" alt="" />
                                <h2>Entrega</h2>
                            </div> 

                            <div className='infoLong'>
                                <h6>Método</h6>
                                <div>
                                    <p>{infoPedido.tipoPagamento}</p>
                                </div>
                            </div>

                            <div className='infoLong'>
                                <h6>Data de pagamento</h6>
                                <div>
                                    <p>{formatarData(infoPedido.dataCompra)}</p>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

                <div className='pedidos'>
                    <h1>Pedidos Pendentes</h1>

                    <p>Aguardando Aprovação</p>
                    <div className='aprovacao'>
                        {aprovacao.map(pedido =>
                            <PedidoAguardando pedido={pedido} setId={mostrarDetalhes}/>
                        )}
                    </div>

                    <p>Em Preparo</p>
                    <div className='preparo'>
                        {preparo.map(pedido =>
                            <PedidoPreparo pedido={pedido} setId={mostrarDetalhes}/>
                        )}
                    </div>

                    <p>A Caminho</p>
                    <div className='caminho'>
                        {emEntrega.map(pedido =>
                            <PedidoCaminho pedido={pedido} setId={mostrarDetalhes}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}