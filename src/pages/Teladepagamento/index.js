import Cabecalho from "../../components/cabecalho";
import Rodape from "../../components/rodape";

export default function TeladePagamento(){

    return(

        <div className="teladePagamento">
            <Cabecalho/>
            <main className="pedido">
                <div className="info-pedido">
                    <div className="encomendas">
                        <h1>Pedidos</h1>
                        <div className="especs-pedido">
                            <img src="" alt="" />
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                        </div>
                    </div>
                </div>
            </main>
            <Rodape/>
        </div>


    )
    
}