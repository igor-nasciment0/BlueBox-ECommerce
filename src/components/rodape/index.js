import './index.scss';

export default function Rodape() {
    return (
        <footer className='common-rodape'>
            <div className='container-tela'>
                <div className='container-mobile-cima'>
                    <section className='secao-atendimento'>
                        <div className='rodape-quadro'>
                            <p>Atendimento</p>
                            <p>(41) 3180-0011</p>
                            <p>Seg a Sex - das 9h às 17h</p>
                        </div>

                        <img src='/assets/images/logo.svg' alt="Logo da BlueBox"/>
                    </section>

                    <div className='linha'></div>

                    <section className='secao-redes'>
                        <div className='rodape-quadro'>
                            <p>PROXYS COMERCIO ELETRONICO LTDA</p>
                            <p>CNPJ: 11.027.350/0001-68</p>
                            <p>Rua Cyro Correia Pereira, 667 - Bloco 12-B</p>
                            <p>CEP: 81170-230 - Cidade Industrial</p>
                            <p>Curitiba - PR</p>
                        </div>

                        <div className='redes-icons first'>
                            <a href=""><img src='/assets/images/icons/facebook.svg' alt='Facebook' /></a>
                            <a href=""><img src='/assets/images/icons/instagram.svg' alt='Instagram' /></a>
                        </div>
                        <div className='redes-icons'>
                            <a href=""><img src='/assets/images/icons/twitter.svg' alt='Twitter' /></a>
                            <a href=""><img src='/assets/images/icons/whatsapp.svg' alt='Whatsapp' /></a>
                        </div>
                    </section>
                </div>
                
                <div className='linha'></div>

                <div className='container-mobile-baixo'>
                    <section className='secao-sobre'>
                        <div className='rodape-quadro'>
                            <h3>Sobre</h3>
                            <p>A BlueBox nasceu em 2023 e faz parte da Proxys Group. </p>
                            <p>Um dos primeiros sites focados no nicho de jogos usados, tornando-se o maior site de compra e venda de jogos e consoles usados no Brasil.</p>
                            <p>Jogos baratos, usados e com garantia, você encontra aqui! Compre e venda seus games usados com a gente. Aproveite que a BlueBox podem oferecer, divirta-se!</p>
                        </div>
                    </section>

                    <div className='linha'></div>

                    <section className='secao-institucional'>
                        <div className='rodape-quadro'>
                            <h3>Institucional</h3>
                            <a href="">Quem somos</a>
                            <a href="">Política de compras e vendas</a>
                            <a href="">Política de trocas e devoluções</a>
                            <a href="">Segurança e Privacidade</a>
                            <a href="">Entrega via motoboy</a>
                            <a href="">10 vantagens</a>
                            <a href="">Trabalhe Conosco</a>
                            <a href="">Newsletter</a>
                            <a href="">Regras para Tributação de ICMS</a>
                        </div>
                    </section>
                </div>     
            </div>
        </footer>
    )
}