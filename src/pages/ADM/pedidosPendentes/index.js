import { useContext, useEffect, useState } from 'react';
import BarraLateral from '../../../components/ADM/barraLateral';
import CabecalhoADM from '../../../components/ADM/cabecalho';
import './index.scss';
import { TemaContext } from '../../../theme';
import { buscarPedidoPorEstado } from '../../../api/pedidoAPI';
import ToastCont from '../../../components/toastContainer';
import { toast } from 'react-toastify';
import { PedidoAguardando, PedidoCaminho, PedidoPreparo } from './pedidos';

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

    useEffect(() => {
        buscarPedidos();
    }, []);

    return (
        <div className={'pagina-pedido-pendente ' + tema}>
            <CabecalhoADM />

            <div className='main'>
                <BarraLateral />
                <ToastCont />

                <div className='produtoDesc'>
                    <div className='produto'>
                        <h2>Produto</h2>

                        <div>
                            <div className='alinhamentoNome'>
                                <h6>Nome</h6>
                                <div  className='nome'>
                                    <p>God of War: Saga (3 Jogos) (Seminovo) - PS3</p>
                                </div>
                            </div>

                            <div>
                                <h6>Qtd.</h6>
                                <div>
                                    <p>1</p>
                                </div>
                            </div>

                            <div>
                                <h6>Valor Unitário</h6>
                                <div>
                                    <p>R$50,00</p>
                                </div>
                            </div>

                        </div>

                    </div>
                    
                    <div className='linhaTempo'>
                        <h2>Linha do Tempo</h2>

                        <div>

                            <div>
                                <h6>Data de Compra</h6>
                                <div>
                                    <p>29/07/2023</p>
                                </div>
                            </div>

                            <div>
                                <h6>Aprovação do Pgt.</h6>
                                <div>
                                    <p>29/07/2023</p>
                                </div>
                            </div>

                            <div>
                                <h6>Saiu para Entrega</h6>
                                <div>
                                    <p>29/07/2023</p>
                                </div>
                            </div>

                            <div>
                                <h6>Entregue</h6>
                                <div>
                                    <p>29/07/2023</p>
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
                                        <p>Rua Um</p>
                                    </div>
                                </div>

                                <div>
                                    <h6>Cidade</h6>
                                    <div>
                                    <p>São Paulo</p>
                                    </div>
                                </div>

                                <div>
                                    <h6>Estado</h6>
                                    <div>
                                    <p>São Paulo</p>
                                    </div>
                                </div>

                            </div>

                            <div className='info'>

                                <div>
                                    <h6>CEP</h6>
                                    <div>
                                    <p>04811-110</p>
                                    </div>
                                </div>

                                <div>
                                    <h6>Complemento</h6>
                                    <div>
                                    <p>Casa</p>
                                    </div>
                                </div>

                                <div>
                                    <h6>N° da Casa</h6>
                                    <div>
                                    <p>N°1000</p>   
                                    </div>
                                </div>

                            </div>

                            <div className='infoLong'>
                                <h6>Nome de Usuário</h6>
                                <div>
                                    <p>Carlos Henrique</p>
                                </div>
                            </div>

                            <div className='infoLong'>
                                <h6>Número de Telefone</h6>
                                <div>
                                    <p>99999-9999</p>
                                </div>
                            </div>

                            <div className='infoLong'>
                                <h6>N° do Pedido</h6>
                                <div>
                                    <p>123.456.789.987.654.321.0</p>
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
                                    <p>Cartão de Crédito</p>
                                </div>
                            </div>

                            <div className='infoLong'>
                                <h6>Número do Cartão</h6>
                                <div>
                                    <p>xxxx-xxxx-xxxx-9876</p>
                                </div>
                            </div>

                            <div className='infoLong'>
                                <h6>Cupom</h6>
                                <div>
                                    <p>ACHEINAGAVETA123</p>
                                </div>
                            </div>

                            <div className='infoLong'>
                                <h6>Nome da Conta</h6>
                                <div>
                                    <p>CARLOS H. DA SILVA PINTO</p>
                                </div>
                            </div>

                            <div className='infoLong'>
                                <h6>Data de pagamento</h6>
                                <div>
                                    <p>01/01/2023</p>
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
                            <PedidoAguardando pedido={pedido}/>
                        )}
                    </div>

                    <p>Em Preparo</p>
                    <div className='preparo'>
                        {preparo.map(pedido =>
                            <PedidoPreparo pedido={pedido}/>
                        )}
                    </div>

                    <p>A Caminho</p>
                    <div className='caminho'>
                        {emEntrega.map(pedido =>
                            <PedidoCaminho pedido={pedido}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}