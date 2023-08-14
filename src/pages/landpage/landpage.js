import './landpage.scss';

import Cabecalho from '../../common/cabecalho/cabecalho';
import FaixaCategorias from '../../common/faixa-categorias/faixa-cat';
import Rodape from '../../common/rodape/rodape'

import iconCaminhao from '../../assets/images/icons/truck.svg';
import iconDinheiro from '../../assets/images/icons/money.svg';
import iconCaixa from '../../assets/images/icons/box.svg';

import imgScorpion from '../../assets/images/backgrounds/scorpion-frente.jpg';
import imgFifa from '../../assets/images/backgrounds/fifa-card.png';
import imgDoll from '../../assets/images/backgrounds/banner-doll.png'; 

import imagemProduto from '../../assets/images/foto_produto.png';
import pacMan from '../../assets/images/backgrounds/pac-man.png';

import logo from '../../assets/images/logo.svg';

export default function Landpage()
{
    return(
        <div className="pagina-landpage">    
            <Cabecalho />
            <FaixaCategorias />

            <main>
                <section className='sec01-hogwarts'>
                    <div className='sec01-container-tela'>
                        <div>
                            <div className='gradient'></div>

                            <div className='container-texto'>
                                <h1>Seus Jogos Favoritos. Na BlueBox.</h1>

                                <div className='container-beneficios'>
                                    <div className='ben-cima'>
                                        <div>
                                            <img src={iconCaminhao} alt="Caminhão de entregas" />
                                            <h3>Entrega rápida</h3>
                                            <h4>Em toda a cidade de são Paulo</h4>
                                        </div>

                                        <div>
                                            <img src={iconDinheiro} alt="Dinheiro economizado" />
                                            <h3>Ótimo custo-benefício</h3>
                                            <h4>Em todos os produtos da loja</h4>
                                        </div>
                                    </div>
                                    
                                    <div className='ben-baixo'>
                                        <div>
                                            <img src={iconCaixa} alt="Pacote entregue" />
                                            <h3>Seu produto em<br/>bom estado</h3>
                                            <h4>Ou seu dinheiro de volta</h4>
                                        </div>
                                    </div>                            
                                </div>
                            </div>
                        </div>    
                    </div>     
                </section>

                <section className='sec02-cards'>
                    <div className='container-cards'>
                        <div className='card-mk'>
                            <div className='card-text'>
                                <h2>Aproveite<br/>nossos<br/>descontos</h2>
                                <a href="">Confira</a>
                            </div>               
                            <img src={imgScorpion} alt="" /> 
                        </div>

                        <div className='card-fifa'>
                            <img src={imgFifa} alt="" />
                            <div className='card-text'>
                                <h2>Seus jogos<br/>favoritos aqui</h2>
                                <a href="">Ver jogos</a>                            
                            </div>
                        </div>

                        <div className='card-doll'>
                            <div className='card-text'>
                                <h2>Descubra mais<br/>sobre nós!</h2>
                                <a href="">Saiba mais</a>                            
                            </div>
                            <img src={imgDoll} alt="" />
                        </div>
                    </div>
                </section>

                <section className='sec03-produtos'>
                    <h1>Destaques</h1>

                    <div className='container-produtos'>
                        <div>
                            <img src={imagemProduto} alt="Assassin's Creed" />
                            <h2>Assassins Creed Brotherhood (Seminovo) - PS3</h2>
                            <h4 className='preco-anterior'>R$ 44,99</h4>
                            <h3 className='preco'>R$ 29,99</h3>

                            <p>Ou em até 10x de R$2,99</p>
                            <p>PIX: 10% de Desconto</p>

                            <a href="">Comprar</a>
                        </div>

                        <div>
                            <img src={imagemProduto} alt="Assassin's Creed" />
                            <h2>Assassins Creed Brotherhood (Seminovo) - PS3</h2>
                            <h4 className='preco-anterior'>R$ 44,99</h4>
                            <h3 className='preco'>R$ 29,99</h3>

                            <p>Ou em até 10x de R$2,99</p>
                            <p>PIX: 10% de Desconto</p>

                            <a href="">Comprar</a>
                        </div>

                        <div>
                            <img src={imagemProduto} alt="Assassin's Creed" />
                            <h2>Assassins Creed Brotherhood (Seminovo) - PS3</h2>
                            <h4 className='preco-anterior'>R$ 44,99</h4>
                            <h3 className='preco'>R$ 29,99</h3>

                            <p>Ou em até 10x de R$2,99</p>
                            <p>PIX: 10% de Desconto</p>

                            <a href="">Comprar</a>
                        </div>

                        <div>
                            <img src={imagemProduto} alt="Assassin's Creed" />
                            <h2>Assassins Creed Brotherhood (Seminovo) - PS3</h2>
                            <h4 className='preco-anterior'>R$ 44,99</h4>
                            <h3 className='preco'>R$ 29,99</h3>

                            <p>Ou em até 10x de R$2,99</p>
                            <p>PIX: 10% de Desconto</p>

                            <a href="/">Comprar</a>
                        </div>
                    </div>
                </section>

                <section className='sec04-descubra'>
                    <h1>Descubra a BlueBox!</h1>
                    <p>A BlueBox é o melhor destino para jogos usados. Encontre clássicos e títulos populares a preços acessíveis. Garantimos qualidade, embalagem intacta e suporte ao cliente. Junte-se a nós em uma jornada sustentável e apaixonante pelos jogos.</p>
                </section>

                <section className='sec05-pac-man'>
                    <div className='pac-img-container'>
                        <img src={pacMan} alt="Fundo Pac-Man" />
                    </div>
                    
                    <div className='pac-text'>
                        <h2>Sente falta dos velhos tempos?</h2>
                        <p>Na BlueBox, você encontra jogos antigos e raros em bom estado para poder reviver as boas memórias sem preocupações. :)</p>
                    </div>
                </section>

                <section className='sec06-sobre'>
                    <h1>Sobre nós</h1>
                    <img src={logo} alt="Logo da BlueBox"/>

                    <div>
                        <p>Conheça a BlueBox: uma plataforma pioneira de jogos usados. Fundada por entusiastas apaixonados por games, a BlueBox oferece uma seleção diversificada de jogos usados de alta qualidade a preços acessíveis.</p>
                        <p>Com um compromisso inabalável com a qualidade, verificamos minuciosamente cada jogo antes de listá-lo em nossa plataforma. </p>
                        <p>Nosso serviço de atendimento ao cliente dedicado garante suporte durante todo o processo. Além disso, valorizamos a sustentabilidade e incentivamos o reuso de jogos, promovendo um consumo mais consciente na comunidade gamer.</p>
                        <p>Junte-se à BlueBox e descubra uma maneira acessível, confiável e sustentável de desfrutar dos seus jogos favoritos.</p>
                    </div>
                </section>
            </main>       

            <Rodape/>
        </div>
    )
}