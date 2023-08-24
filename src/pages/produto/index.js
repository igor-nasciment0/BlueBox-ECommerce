import './index.scss';

import Cabecalho from '../../components/cabecalho';
import Rodape from '../../components/rodape';
import CabecalhoLog from '../../components/cabecalho(logado)';

import { Link } from 'react-router-dom/dist';

export default function Pedido() {
    return(
        <div className="pagina-produto">
            <Cabecalho/>
            
            <div className="container-main">
                <main>
                    <div className="container-produto">
                        <div className="imagens">
                            <div className="cont-imagem-principal">
                                <img src="/assets/images/foto_produto.png" alt="" />
                            </div>

                            <div className="cont-imagens-secundarias">
                                <div><img src="/assets/images/foto_produto.png" alt="" /></div>
                                <div><img src="/assets/images/foto_produto.png" alt="" /></div>
                                <div><img src="/assets/images/foto_produto.png" alt="" /></div>
                                <div><img src="/assets/images/foto_produto.png" alt="" /></div>
                            </div>
                        </div>

                        <div className="info">
                            <h1>God of War: Saga (3 Jogos) (Seminovo) - PS3</h1>

                            <div className="avaliacao">
                                <img src="/assets/images/estrelasRate.png" alt="" />
                                (46 avaliações)
                            </div>

                            <div className="preco">
                                <div>
                                    <h3>De: R$ 44,99</h3>
                                    <h2>R$ 29,99</h2>
                                    <h4>Ou em até 10x</h4>
                                </div>

                                <div className='linha'></div>

                                <h3>33% de Desconto</h3>
                            </div>

                            <Link>Ver os meios de pagamento</Link>

                            <div className="sobre">
                                <h4>Sobre</h4>
                                <p>God of War: Collection tem como proposta central trazer o esplendor da série através de visuais em alta definição e uma jogabilidade ainda mais fluida. O game apresenta um compilado dos dois títulos mais aclamados da geração passada, agora com jogabilidade e gráficos melhorados...</p>
                                <Link>Ver mais</Link>
                            </div>

                            <ul>
                                <li>Plataforma: <b>PS3</b></li>
                                <li>Formato: <b>Físico</b></li>
                                <li>É online: <b>Sim</b></li>
                            </ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                        </div>

                        <div className="entrega">
                            
                        </div>
                    </div>
                </main>
            </div>

            <Rodape/>
        </div>
    )
}