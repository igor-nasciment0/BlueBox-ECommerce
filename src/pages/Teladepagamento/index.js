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
                        <div className="especs-pedido">
                            <img src="/assets/images/foto_produto.png" alt="" />
                            <p>God of War: Saga (3 Jogos) (Seminovo) - PS3</p>
                            <div>
                              <p>Qtd</p>
                              <p> <button>-</button> 2 <button>+</button> </p>
                            </div>

                            <div>
                              <p>Subtotal</p>
                              <p>29,99</p>
                            </div>
                        </div>
                    </div>

                    <div className="metodos-pagamento">

                    </div>
                </div>
            </main>
            <Rodape/>
        </div>


    )
    
}