import BarraLateral from '../../../components/ADM/barraLateral';
import CabecalhoADM from '../../../components/ADM/cabecalho';
import './index.scss';

export default function CadastroProduto() {
    return(
        <div className="pagina-cadastro-produto">
            <CabecalhoADM />
            <main>
                <BarraLateral/>
                <div className='informacoes-cadastro-produto'>

                    <h1>Registro de produto</h1>

                    <div className="foto-produto"> 
                        <div className='foto-principal'></div>

                        <div className="fotos-adicionais">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>

                </div>
            </main>


        </div>
    )
}