import './index.scss';

import Cabecalho from '../../components/cabecalho';
import Rodape from '../../components/rodape';
import CabecalhoLog from '../../components/cabecalho(logado)';
import CardProduto from '../../components/cardProduto';

import { Link } from 'react-router-dom/dist';

export default function Pedido() {
    return(
        <div className="pagina-produto">
            <CabecalhoLog/>
            
            <div className="container-main">
                <main>
                    <section className="container-produto">
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

                                <div className='desconto'>
                                    <h3>33% de Desconto</h3>
                                </div>
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
                            <h2>R$ 29,99</h2>
                            <hr/>

                            <div className="input-cep">
                                <h3>Descobrir formas de entrega</h3>
                                <input type="text" placeholder="Digite seu CEP"/>
                            </div>

                            <div className="container-entregas">
                                <h2>Entrega mais Rápida</h2>

                                <div>
                                    <img src="/assets/images/loggiLogo.png" alt="" />
                                    <div>
                                        <h4>Entrega Loggi</h4>
                                        <p>Receba em até 2 dias úteis</p>
                                        <h5>R$ 10.99</h5>
                                    </div>
                                </div>
                            </div> 

                            <button className="btn-comprar">Comprar agora</button>
                            <button className="btn-carrinho">Adicionar ao carrinho</button> 
                        </div>
                    </section>

                    <section className="sec-relacionados">
                        <h1>Relacionados</h1>

                        <div>
                            <CardProduto tema="tema-cinza"/>
                            <CardProduto tema="tema-cinza"/>
                            <CardProduto tema="tema-cinza"/>
                            <CardProduto tema="tema-cinza"/>
                        </div>
                    </section>

                    <section className="sec-detalhes">
                        <h1>Informações</h1>

                        <div className="info-usado">
                            <h2>Importante</h2>
                            <p>Esse produto é usado. Garantimos sua perfeita funcionabilidade. ;)</p>
                            <h3>Estado do Jogo:</h3>

                            <ul>
                                <li>Disco: Sem riscos ou arranhões visíveis, funcionamento perfeito.</li>
                                <li>Embalagem: Caixa original em ótimo estado, com mínimas marcas de desgaste.</li>
                                <li>Manual: Manual de instruções incluído e em excelente condição.</li>
                            </ul>

                            <p>Sendo um produto usado, as imagens são apenas para fins ilustrativos e podem não refletir seu estado real.</p>
                        </div>
                        
                        <div>
                            <h2>Descrição do Produto</h2>
                            <p>God of War: Collection tem como proposta central trazer o esplendor da série através de visuais em alta definição e uma jogabilidade ainda mais fluida. O game apresenta um compilado dos dois títulos mais aclamados da geração passada, agora com jogabilidade e gráficos melhorados, mas todas a qualidade da série mantida. A taxa estável de 60 quadros por segundo mostra que o terceiro PlayStation não encontra problemas em reproduzir os dois games com a aplicação de filtros de correção de bordas serrilhadas e cores ainda mais vibrantes.</p>
                            <p>Além disso, os dois jogos refeitos contam com o sistema de troféus da PSN. Com isso, os gamers têm a possibilidade de comparar conquistas adquiridas através do progresso nas tramas dos primeiros games de Kratos. Os troféus consistem em uma adição interessante para quem gosta de ser recompensado pelos grandes feitios durante a ação de God of War. Reviva toda a nostálgia da série que conquistou seu lugar no mundo dos games, com seus dois primeiro títulos em uma só coleção.</p>
                        </div>

                        <h2>Especificações</h2>                       
                        <div className="tabela-especificacoes">
                            <div className="linha">
                                <div>Desenvolvedora:</div>
                                <div>Santa Monica Studios</div>
                            </div>

                            <div className="linha">
                                <div>Publicadora:</div>
                                <div>Sony Interactive Entertainment</div>
                            </div>

                            <div className="linha">
                                <div>Data de Lançamento:</div>
                                <div>28/08/2012</div>
                            </div>
                        </div>
                    </section>
                </main>

                <section className="sec-comentarios">
                    <div>
                        <div className="avaliacao-geral">
                            <h2>Avaliação Geral do Produto</h2>
                            <h3>4.8</h3>
                            <img src="/assets/images/estrelasRate.png" alt="" />
                            <h4>46 avaliações</h4>
                        </div>
                        <div className="container-avalie">
                            <div>
                                <h2>Já comprou este produto?</h2>
                                <h3>Ajude os outros a saberem o que comprar.</h3>
                                <img src="/assets/images/estrelasRate.png" alt="" />
                                <p>Adorei!</p>
                            </div>

                            <div>
                                <textarea cols="30" rows="10" placeholder="Gostaria de dizer um pouco mais?"></textarea>
                                <button>Postar</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Rodape/>
        </div>
    )
}