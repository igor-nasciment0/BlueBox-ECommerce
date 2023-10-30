import BarraLateral from '../../../components/ADM/barraLateral';
import CabecalhoADM from '../../../components/ADM/cabecalho';
import './index.scss';

export default function PedidoPendente() {
    return (
        <div className='pagina-pedido-pendente'>
            <CabecalhoADM />

            <div className='main'>
                <BarraLateral />

                <div className='pedidos'>
                    <h1>Pedidos Pendentes</h1>

                    <p>Aguardando Aprovação</p>
                    <div className='aprovacao'>
                        <div className='produto'>
                            <div>
                                <h6>Produto</h6>
                                <p>God of War: Saga (3 Jogos) (Seminovo) - PS3</p>
                            </div>
                            <div>
                                <h6>QTD.</h6>
                                <p>1</p>
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
                    </div>

                    <p>Em Preparo</p>
                    <div className='preparo'>
                        <div className='produto'>
                            <div>
                                <h6>Produto</h6>
                                <p>God of War: Saga (3 Jogos) (Seminovo) - PS3</p>
                            </div>
                            <div>
                                <h6>QTD.</h6>
                                <p>1</p>
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
                    </div>

                    <p>A Caminho</p>
                    <div className='caminho'>
                        <div className='produto'>
                            <div>
                                <h6>Produto</h6>
                                <p>God of War: Saga (3 Jogos) (Seminovo) - PS3</p>
                            </div>
                            <div>
                                <h6>QTD.</h6>
                                <p>1</p>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}