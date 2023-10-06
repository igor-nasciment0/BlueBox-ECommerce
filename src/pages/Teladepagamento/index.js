import Cabecalho from "../../components/cabecalho";
import Rodape from "../../components/rodape";
import './index.scss';

export default function TeladePagamento(){

    return(

        <div className="teladePagamento">
            <Cabecalho/>
            <main className="pedido">
                <div className="info-pedido">
                    <div className="encomendas">
                        <h1>Pedido</h1>

                        <div className="produtos">

                            <div className="especs-pedido">
                                <img src="/assets/images/foto_produto.png" alt="" />
                                <p>God of War: Saga (3 Jogos) (Seminovo) - PS3</p>
                                <div>
                                <p>Qtd</p>
                                <p> 2 </p>
                                </div>

                                <div>
                                <p>Subtotal</p>
                                <p>29,99</p>
                                </div>
                            </div>

                            <div className="especs-pedido">
                                <img src="/assets/images/foto_produto.png" alt="" />
                                <p>God of War: Saga (3 Jogos) (Seminovo) - PS3</p>
                                <div>
                                <p>Qtd</p>
                                <p> 2 </p>
                                </div>

                                <div>
                                <p>Subtotal</p>
                                <p>29,99</p>
                                </div>
                            </div>

                            <div className="especs-pedido">
                                <img src="/assets/images/foto_produto.png" alt="" />
                                <p>God of War: Saga (3 Jogos) (Seminovo) - PS3</p>
                                <div>
                                <p>Qtd</p>
                                <p> 2 </p>
                                </div>

                                <div>
                                <p>Subtotal</p>
                                <p>29,99</p>
                                </div>
                            </div>

                        </div>
                        
                    </div>

                    <div className="metodos-pagamento">
                        <p>Escolha seu metodo de pagamento:</p>
                        <button>PIX</button>
                        <button>Cartão de credito</button>
                        <button>Cartão de debito</button>
                        <button>Boleto</button>
                    </div>

                    <div className="bandeira-cartões"><img src="/assets/images/Bandeiracartão.png" alt="" /></div>
                </div>
            </main>
            <Rodape/>
        </div>


    )
    
}