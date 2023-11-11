import './index.scss';

import Cabecalho from '../../components/cabecalho';
import FaixaCategorias from '../../components/faixa-categorias';
import Rodape from '../../components/rodape'
import CardProduto from '../../components/cardProduto'
import { useContext, useEffect, useState } from 'react';
import { TemaContext } from '../../theme';
import { buscarProdutosPagina } from '../../api/produtoAPI';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ToastCont from '../../components/toastContainer';

export default function Pesquisa() {
  const context = useContext(TemaContext);
  let tema = context.tema;

  const location = useLocation();
  const navigate = useNavigate();
  let busca = new URLSearchParams(location.search).get('busca');

  if (!busca)
    busca = '';

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
  const [proxTela, setProxTela] = useState(false);

  const [filtroUsado, setFiltroUsado] = useState('');
  const [ordemPreco, setOrdemPreco] = useState('');
  const [categoria, setCategoria] = useState('');

  function marcarCaixa(valor, valorAtual, setValor) {
    if (valorAtual !== valor) {
      setValor(valor);
    } else {
      setValor('');
    }
  }

  function selecionado(cat) {
    if (categoria === cat) {
      return { color: "var(--azul-claro)" }
    } else
      return {}
  }

  async function buscarProdutos() {
    try {
      console.log(categoria);
      let prod = await buscarProdutosPagina(busca, categoria, ordemPreco, filtroUsado, page);
      
      setProdutos(prod);

      let prodProximaTela = await buscarProdutosPagina(busca, categoria, ordemPreco, filtroUsado, page + 1);
      if (prodProximaTela.length > 0) {
        setProxTela(true);
      }

    } catch (error) {
      console.log(error);
      toast.error('Não foi possível realizar a busca.');
    }
  }

  useEffect(() => {
    let state = location.state;
    if (state) {
      if (state.cat) {
        setCategoria(state.cat)
      }
    }
  }, [location])

  useEffect(() => {
    buscarProdutos();
  }, [busca, page, filtroUsado, ordemPreco, categoria])

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

      <div className='filtroResp' style={displayBarra}>

        <div className='logoFiltro'>
          <img src="/assets/images/3pontos.png" alt="" onClick={barraLateral} className={displayBarra.display === 'flex' && 'img-branco'} />
        </div>

        <div className='secFiltro'>
          <h2>Filtrar</h2>

          <h3>Tipo</h3>

          <div className='marcacaoResp'>
            <div className='caixaResp'>
              <input type="checkbox" checked={filtroUsado === 'novo'} onClick={() => marcarCaixa('novo', filtroUsado, setFiltroUsado)} />
              <p>Novo</p>
            </div>
            <div className='caixaResp'>
              <input type="checkbox" checked={filtroUsado === 'usado'} onClick={() => marcarCaixa('usado', filtroUsado, setFiltroUsado)} />
              <p>Usado</p>
            </div>
          </div>

          <h3>Preço</h3>

          <div className='marcacaoResp'>
            <div className='caixaResp'>
              <input type="checkbox" checked={ordemPreco === 'menor_preco'} onClick={() => marcarCaixa('menor_preco', ordemPreco, setOrdemPreco)} />
              <p>Menor Preço</p>
            </div>
            <div className='caixaResp'>
              <input type="checkbox" checked={ordemPreco === 'maior_preco'} onClick={() => marcarCaixa('maior_preco', ordemPreco, setOrdemPreco)} />
              <p>Maior Preço</p>
            </div>
          </div>

          <h3>Categorias</h3>

          <h4 style={selecionado("Playstation")} onClick={() => setCategoria('Playstation')}>Playstation</h4>
          <h4 style={selecionado("Xbox")} onClick={() => setCategoria('Xbox')}>Xbox</h4>
          <h4 style={selecionado("Nintendo")} onClick={() => setCategoria('Nintendo')}>Nintendo</h4>
          <h4 style={selecionado("Consoles")} onClick={() => setCategoria('Consoles')}>Consoles</h4>
          <h4 style={selecionado("Acessórios")} onClick={() => setCategoria('Acessórios')}>Acessórios</h4>
          <h4 style={selecionado("Raridades")} onClick={() => setCategoria('Raridades')}>Raridades</h4>

          <button className='limpar' onClick={() => {
            setFiltroUsado('');
            setCategoria('');
            setOrdemPreco('');
          }}>Limpar Filtros</button>
        </div>
      </div>

      <div className='s1'>
        <div className='filtro'>
          <h1>Filtrar</h1>

          <h2>Tipo</h2>

          <div className='caixaMarcacao'>
            <div className='caixa'>
              <input type="checkbox" checked={filtroUsado === 'novo'} onClick={() => marcarCaixa('novo', filtroUsado, setFiltroUsado)} />
              <p>Novo</p>
            </div>
            <div className='caixa'>
              <input type="checkbox" checked={filtroUsado === 'usado'} onClick={() => marcarCaixa('usado', filtroUsado, setFiltroUsado)} />
              <p>Usado</p>
            </div>
          </div>

          <h2>Preço</h2>

          <div className='caixaMarcacao'>
            <div className='caixa'>
              <input type="checkbox" checked={ordemPreco === 'menor_preco'} onClick={() => marcarCaixa('menor_preco', ordemPreco, setOrdemPreco)} />
              <p>Menor Preço</p>
            </div>
            <div className='caixa'>
              <input type="checkbox" checked={ordemPreco === 'maior_preco'} onClick={() => marcarCaixa('maior_preco', ordemPreco, setOrdemPreco)} />
              <p>Maior Preço</p>
            </div>
          </div>

          <h2>Categorias</h2>

          <h4 style={selecionado("Playstation")} onClick={() => setCategoria('Playstation')}>Playstation</h4>
          <h4 style={selecionado("Xbox")} onClick={() => setCategoria('Xbox')}>Xbox</h4>
          <h4 style={selecionado("Nintendo")} onClick={() => setCategoria('Nintendo')}>Nintendo</h4>
          <h4 style={selecionado("Consoles")} onClick={() => setCategoria('Consoles')}>Consoles</h4>
          <h4 style={selecionado("Acessórios")} onClick={() => setCategoria('Acessórios')}>Acessórios</h4>
          <h4 style={selecionado("Raridades")} onClick={() => setCategoria('Raridades')}>Raridades</h4>

          <button className='limpar' onClick={() => {
            setFiltroUsado('');
            setCategoria('');
            setOrdemPreco('');
          }}>Limpar Filtros</button>
        </div>

        <div className='produtosInsta'>

          <div className='logoFiltro'>
            <img src="/assets/images/3pontos.png" alt="" onClick={barraLateral} className={(displayBarra.display === 'flex' || tema === 'dark') && 'img-branco'} />
          </div>

          <h1 className='titulo'>Resultado</h1>

          <div className='produtos'>
            {produtos.map(arrayProduto =>
              <div className='container-produto'>
                <CardProduto infoProduto={arrayProduto} />
              </div>
            )}
          </div>

          <div className='nav'>
            <div className={'setas ' + (!(page > 1) && 'gray')} onClick={() => { if (page > 1) navigate(`/pesquisa?busca=${busca}&page=${page - 1}`) }}>
              <img src="/assets/images/icons/setaEsq.svg" alt="SetaEsq" />
            </div>

            <div className='numPagina'>
              <p>Página {page}</p>
            </div>

            <div className={'setas ' + (!proxTela && 'gray')} onClick={() => { if (proxTela) navigate(`/pesquisa?busca=${busca}&page=${page + 1}`) }}>
              <img src="/assets/images/icons/arrow-right.svg" alt="SetaDir" />
            </div>

          </div>

          <div className='instagram'>
            <p>Nos siga no Instagram</p>
            <p>Novidades toda semana!</p>
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