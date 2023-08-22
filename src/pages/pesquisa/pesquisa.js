import './pesquisa.scss';

import Cabecalho from '../../components/cabecalho/';
import FaixaCategorias from '../../components/faixa-categorias/';
import Rodape from '../../components/rodape/'

export default function Pesquisa() 
{
  return(
    <div className='pesquisaBody'>
      <Cabecalho/>
      <FaixaCategorias/>
    
      <div className='infoNavagacao'>
        <a href=''>Página inicial...</a>
        <p>|</p>
        <a>Resultado da pesquisa</a>
      </div>

      <div className='s1'>
        <div className='filtro'>
          <h1>Filtrar</h1>

          <h2>Tipo</h2>

          <div className='caixaMarcacao'></div>

          <h2>Preço</h2>

          <input type="range" />
          
          <h2>Categorias</h2>

          <a href="">Playstation 1</a>
          <a href="">Playstation 2</a>
          <a href="">Playstation 3</a>
          <a href="">Playstation 4</a>
          <a href="">Playstation 5</a>
          <a href="">Playstation Portable</a>
          <a href="">Playstation Vita</a>
          <a href="">Xbox 360</a>
          <a href="">Xbox One</a>
          <a href="">Xbox Series X & S</a>
          <a href="">Nintendo 64</a>
          <a href="">Nintendo GameCube</a>
          <a href="">Wii</a>
          <a href="">Nintendo Switch</a>
          <a href="">Game Boy</a>
          <a href="">Nintendo 3DS & 2DS</a>
          <a href="">Controle</a>
          <a href="">Mouse</a>
          <a href="">Teclado</a>
          <a href="">Notebook</a>
          <a href="">PC Gamer</a>
          <a href="">Action Figures</a>
          <a href="">Jogos de Mesa</a>
          <a href="">Colecionáveis</a>
        </div>
        <div className='produtosInsta'>
          <div className='produtos'>
            <h1>Novidades</h1>
            <div className='cartoesProduto'>
              <div className='cards'>
                <img src="" alt="" />
                <h3>Jogo The Legend of Zelda: Twilight Princess - Wii</h3>
                <h2>R$49,99</h2>
                <p>
                  Ou em 10x de R$4,99 
                  <br/>
                  PIX: 10% de Desconto
                </p>
                <a href="">Comprar</a>
              </div>
              <div className='cards'><img src="" alt="" />
                <h3>Jogo The Legend of Zelda: Twilight Princess - Wii</h3>
                <h2>R$49,99</h2>
                <p>
                  Ou em 10x de R$4,99 
                  <br/>
                  PIX: 10% de Desconto
                </p>
                <a href="">Comprar</a></div>
              <div className='cards'><img src="" alt="" />
                <h3>Jogo The Legend of Zelda: Twilight Princess - Wii</h3>
                <h2>R$49,99</h2>
                <p>
                  Ou em 10x de R$4,99 
                  <br/>
                  PIX: 10% de Desconto
                </p>
                <a href="">Comprar</a></div>
              <div className='cards'><img src="" alt="" />
                <h3>Jogo The Legend of Zelda: Twilight Princess - Wii</h3>
                <h2>R$49,99</h2>
                <p>
                  Ou em 10x de R$4,99 
                  <br/>
                  PIX: 10% de Desconto
                </p>
                <a href="">Comprar</a></div>
            </div>
            <div>
              <div className='cards'><img src="" alt="" />
                <h3>Jogo The Legend of Zelda: Twilight Princess - Wii</h3>
                <h2>R$49,99</h2>
                <p>
                  Ou em 10x de R$4,99 
                  <br/>
                  PIX: 10% de Desconto
                </p>
                <a href="">Comprar</a></div>
              <div className='cards'><img src="" alt="" />
                <h3>Jogo The Legend of Zelda: Twilight Princess - Wii</h3>
                <h2>R$49,99</h2>
                <p>
                  Ou em 10x de R$4,99 
                  <br/>
                  PIX: 10% de Desconto
                </p>
                <a href="">Comprar</a></div>
              <div className='cards'><img src="" alt="" />
                <h3>Jogo The Legend of Zelda: Twilight Princess - Wii</h3>
                <h2>R$49,99</h2>
                <p>
                  Ou em 10x de R$4,99 
                  <br/>
                  PIX: 10% de Desconto
                </p>
                <a href="">Comprar</a></div>
              <div className='cards'><img src="" alt="" />
                <h3>Jogo The Legend of Zelda: Twilight Princess - Wii</h3>
                <h2>R$49,99</h2>
                <p>
                  Ou em 10x de R$4,99 
                  <br/>
                  PIX: 10% de Desconto
                </p>
                <a href="">Comprar</a></div>
            </div>
          </div>
          <div className='instagram'>
            <a href="">Nos siga no Instagram</a>
            <a href="">Novidades toda semana!</a>
            <img src="" alt="" />
            <img src="" alt="" />
          </div>
        </div>
      </div>

      <Rodape/>
    </div>
  )
}