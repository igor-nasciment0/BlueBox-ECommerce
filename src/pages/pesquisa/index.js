import './index.scss';

import Cabecalho from '../../components/cabecalho';
import FaixaCategorias from '../../components/faixa-categorias';
import Rodape from '../../components/rodape'
import CardProduto from '../../components/cardProduto'
import { useContext, useEffect, useState } from 'react';
import { TemaContext } from '../../theme';
import { buscarProdutos, buscarProdutosPagina } from '../../api/produtoAPI';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ToastCont from '../../components/toastContainer';

export default function Pesquisa() {
  const context = useContext(TemaContext);
  let tema = context.tema;

  const location = useLocation();
  const navigate = useNavigate();
  const busca = new URLSearchParams(location.search).get('busca');

  const [pageObject] = useSearchParams();
  if (!pageObject.get('page'))
    pageObject.set('page', 1);

  let page = Number(pageObject.get('page'));

  const [displayBarra, setDisplayBarra] = useState({
    display: 'none'
  })

  function barraLateral() {
    if (displayBarra.display === 'none')
      setDisplayBarra({ display: 'flex' })
    else
      setDisplayBarra({ display: 'none' })
  }

  const [produtos, setProdutos] = useState([])

  async function buscarProdutos() {
    try {
      let prod = await buscarProdutosPagina(busca, '', '', page);
      
      let array = []

      for (let i = 0; i < prod.length / 5; i++) {
        array.push(prod.slice(i * 4, (i + 1) * 4));
      }

      setProdutos(array);
    } catch (error) {
      console.log(error);
      toast.error('Não foi possível realizar a busca.');
    }
  }

  useEffect(() => {
    buscarProdutos();
  }, [busca, page])

  return (
    <div className={'pesquisaBody ' + tema}>
      <Cabecalho />
      <FaixaCategorias />
      <ToastCont />

      <div className='infoNavegacao'>
        <Link to={'/'}>Página inicial...</Link>
        <p>|</p>
        <p>Resultado da pesquisa</p>
      </div>

      <div className='logoFiltro'>
        <img src="/assets/images/3pontos.png" alt="" onClick={barraLateral} className={(displayBarra.display === 'flex' || tema === 'dark') && 'img-branco'} />
      </div>

      <div className='filtroResp' style={displayBarra}>

        <div className='logoFiltro'>
          <img src="/assets/images/3pontos.png" alt="" onClick={barraLateral} className={displayBarra.display === 'flex' && 'img-branco'} />
        </div>

        <div className='secFiltro'>
          <h2>Filtrar</h2>

          <h3>Tipo</h3>

          <div className='marcacaoResp'>
            <div className='caixaResp'>
              <input type="checkbox" />
              <p>Novo</p>
            </div>
            <div className='caixaResp'>
              <input type="checkbox" />
              <p>Usado</p>
            </div>
          </div>

          <h3>Preço</h3>

          <div className='marcacaoResp'>
            <div className='caixaResp'>
              <input type="checkbox" />
              <p>Menor Preço</p>
            </div>
            <div className='caixaResp'>
              <input type="checkbox" />
              <p>Maior Preço</p>
            </div>
          </div>

          <h3>Categorias</h3>

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
      </div>

      <div className='s1'>
        <div className='filtro'>
          <h1>Filtrar</h1>

          <h2>Tipo</h2>

          <div className='caixaMarcacao'>
            <div className='caixa'>
              <input type="checkbox" />
              <p>Novo</p>
            </div>
            <div className='caixa'>
              <input type="checkbox" />
              <p>Usado</p>
            </div>
          </div>

          <h2>Preço</h2>

          <div className='caixaMarcacao'>
            <div className='caixa'>
              <input type="checkbox" />
              <p>Menor Preço</p>
            </div>
            <div className='caixa'>
              <input type="checkbox" />
              <p>Maior Preço</p>
            </div>
          </div>

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

          <h1 className='titulo'>Resultado</h1>

          <div className='produtos'>
            {produtos.map(arrayProduto =>
              <div className='cartoesProduto'>
                {arrayProduto.map(produto =>
                  <CardProduto infoProduto={produto} />
                )}
              </div>
            )}
          </div>

          <div className='nav'>
            <div className='setas' onClick={() => { if (page > 1) navigate(`/pesquisa?busca=${busca}&page=${page - 1}`) }}>
              <img src="/assets/images/icons/setaEsq.svg" alt="SetaEsq" />
            </div>

            <div className='numPagina'>
              <p>Página {page}</p>
            </div>

            <div className='setas' onClick={() => { if (produtos.length !== 30) navigate(`/pesquisa?busca=${busca}&page=${page + 1}`) }}>
              <img src="/assets/images/icons/arrow-right.svg" alt="SetaDir" />
            </div>

          </div>

          <div className='instagram'>
            <a href="">Nos siga no Instagram</a>
            <a href="">Novidades toda semana!</a>
            <div className='stardewValley'>
              <div className='degrade'></div>
              <img src="/assets/images/backgrounds/stardewvalleyWallpaper.png" alt="Stardew Valley" />
              <div className='degrade2'></div>
            </div>
            <img className='galinha' src="/assets/images/galinha.png" alt="Galinha" />
          </div>
        </div>
      </div>

      <Rodape />
    </div>
  )
}