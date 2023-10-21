import './index.scss';

import Cabecalho from '../../components/cabecalho';
import Rodape from '../../components/rodape';
import CardProduto from '../../components/cardProduto';

import { Link, redirect, useParams } from 'react-router-dom/dist';
import { useContext, useEffect, useState } from 'react';
import { TemaContext } from '../../theme';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { buscarImagens, buscarProdutoPorID, mostrarUrlImagem } from '../../api/produtoAPI';
import { formatarData, separarEspecificacoes, separarTexto } from '../../api/funcoesGerais';

import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';

import {toast, ToastContainer} from 'react-toastify';
import { buscarAvaliacoes, darLike, postarAvaliacao, tirarLike, verificarLike, verificarNumeroLikes } from '../../api/avaliacaoAPI';
import { get } from 'local-storage';

export default function Produto() {
    const context = useContext(TemaContext);
    let tema = context.tema;

    const idProduto = useParams().id;
    const idCliente = get('user-login').id;

    const [produto, setProduto] = useState({});
    const [imagemPrincipal, setImagemPrincipal] = useState({});
    const [imagensSecundarias, setImagensSecundarias] = useState([]);
    const [precoReal, setPrecoReal] = useState(10);
    const [preco, setPreco] = useState(0);
    const [especificacoes, setEspecificacoes] = useState([]);
    const [descricao, setDescricao] = useState([]);

    const [avaliacoes, setAvaliacoes] = useState([]);

    const [comentario, setComentario] = useState('');
    const [nota, setNota] = useState(5);

    const conversor = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    async function buscarProduto() {
        try {
            let p = await buscarProdutoPorID(idProduto);
            setProduto(p);

            let arrayProvisorio = [];

            let imagens = await buscarImagens(idProduto);
            for(let i = 0; i < imagens.length; i++) {
                let imagem = imagens[i];
                
                if(imagem.primaria)
                    setImagemPrincipal(imagem);
                else 
                    arrayProvisorio.push(imagem);
            }

            setImagensSecundarias(arrayProvisorio);
        } catch (error) {
            redirect('/');
            toast.error('Ocorreu um erro ao carregar o produto');
        }
    }

    async function buscarRatings() {
        try {
            let ratings =  await buscarAvaliacoes(idProduto);
            
            for(let i = 0; i < ratings.length; i++) {
                let r = ratings[i];

                let boolLike = await verificarLike(idCliente, r.id);
                let numLikes = await verificarNumeroLikes(r.id);

                r.deuLike = boolLike.deuLike;
                r.likes = numLikes.numeroLikes;
            }

            setAvaliacoes(ratings);
            console.log(ratings)

        } catch (error) {
            if(error.response) {
                toast.error(error.response.data);
            } else {
                toast.error(error.message);
            }            
        }
    }

    async function postAvaliacao() {
        try {            
            await postarAvaliacao(idProduto, idCliente, comentario, nota);
            await buscarProduto();

            toast.success('Comentário adicionado. Obrigado pela contribuição!')

            setComentario('');

        } catch (error) {
            if(error.response) {
                toast.error(error.response.data)
            } else {
                toast.error(error.message)
            }
        }
    }

    async function handleLike(avaliacao) {
        try {
            if(avaliacao.deuLike) {
                await tirarLike(idCliente, avaliacao.id);
            } else {
                await darLike(idCliente, avaliacao.id);
            }

            buscarRatings();

        } catch (error) {
            if(error.response) 
                toast.error(error.response.data);
            else
                toast.error(error.message);
        }
    }

    useEffect(() => {
        buscarProduto();
        buscarRatings();
    }, [])

    useEffect(() => {
        produto.promocao ?
            setPrecoReal(produto.valorPromocional) :
            setPrecoReal(produto.preco)

        setEspecificacoes(separarEspecificacoes(produto.especificacoes));
        setDescricao(separarTexto(produto.descricao));
        setPreco(produto.preco);
    }, [produto]);

    function valorEmReais(valor) {
        return conversor.format(Number(valor)); 
    }

    function calcularDesconto(valorNormal, valorPromocao) {
        let desconto = (valorNormal - valorPromocao) / valorNormal * 100
        return desconto.toFixed();
    }

    return(
        <div className={"pagina-produto " + tema}>
            <Cabecalho/>
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            
            <div className="container-main">
                <main>
                    <section className="container-produto">
                        <div className='mobile-container-cima'>
                            <div className="imagens">
                                <div className="cont-imagem-principal">
                                    <InnerImageZoom src={mostrarUrlImagem(imagemPrincipal.url)} zoomScale={1.5}/>
                                </div>

                                <div className="cont-imagens-secundarias">
                                    {imagensSecundarias.map(imagem => 
                                        <div>
                                            <img src={mostrarUrlImagem(imagem.url)} alt="" />
                                        </div>)}
                                </div>
                            </div>

                            <div className="info">
                                <h1>{produto.nome}</h1>

                                <div className="avaliacao">
                                    <img src="/assets/images/estrelasRate.png" alt="" />
                                    (46 avaliações)
                                </div>

                                <div className="preco">
                                    <div>
                                        {produto.promocao && <h3>De: {valorEmReais(preco)}</h3>}
                                        <h2>{valorEmReais(precoReal)}</h2>
                                        <h4>Ou em até 10x de {valorEmReais((precoReal / 10) - 0.01)}</h4>
                                    </div>

                                    {produto.promocao && 
                                    <div className='desconto'>
                                        <h3>{calcularDesconto(produto.preco, produto.valorPromocional)}% de Desconto</h3>
                                    </div>
                                    }
                                </div>

                                <Link>Ver os meios de pagamento</Link>

                                <div className="sobre">
                                    <h4>Sobre</h4>
                                    <p>{produto.descricao && produto.descricao.slice(0, 270)}...</p>
                                    <AnchorLink href='#detalhes'>Ver mais</AnchorLink>
                                </div>

                                <ul>
                                    {especificacoes.map((spec, index) => index < 3 &&
                                        <li>{spec.chave}: <b>{spec.valor}</b></li>
                                    )}
                                </ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                            </div>    
                        </div>
                        

                        <div className="entregas">
                            <h2>{valorEmReais(precoReal)}</h2>
                            <hr/>

                            <div className="input-cep">
                                <h3>Descobrir formas de entrega</h3>
                                <input type="text" placeholder="Digite seu CEP"/>
                            </div>

                            <div className="container-entregas">
                                <div className="entrega">
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

                                <div className="entrega">
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
                            </div> 

                            <button className="btn-comprar" onClick={separarEspecificacoes}>Comprar agora</button>
                            <button className="btn-carrinho">Adicionar ao carrinho</button> 
                        </div>
                    </section>

                    <section className="sec-relacionados">
                        <h1>Relacionados</h1>

                        <div className='container-produtos'>
                            <div>
                                <CardProduto />
                                <CardProduto />
                            </div>

                            <div>
                                <CardProduto />
                                <CardProduto />
                            </div>
                        </div>
                    </section>

                    <section className="sec-detalhes" id='detalhes'>
                        <h1>Informações</h1>

                        {produto.usado &&
                            <div className="info-usado">
                                <h2>Importante</h2>
                                <p>Esse produto é usado. Garantimos sua perfeita funcionabilidade. ;)</p>
                                <h3>Garantimos para este jogo, console ou acessório:</h3>

                                <ul>
                                    <li>Nada de riscos ou arranhões visíveis, funcionamento perfeito.</li>
                                    <li>Embalagem: Caixa original em ótimo estado, com mínimas marcas de desgaste.</li>
                                    <li>Manual: Manual de instruções incluído e em excelente condição.</li>
                                </ul>

                                <p>Sendo um produto usado, as imagens podem não refletir seu estado real.</p>
                            </div>
                        }
                        
                        
                        <div>
                            <h2>Descrição do Produto</h2>

                            {descricao.map(paragrafo => 
                                <p>{paragrafo}</p>
                            )}
                        </div>

                        <h2>Especificações</h2>                       
                        <div className="tabela-especificacoes">
                            {especificacoes.map(spec => 
                                <div className="linha">
                                    <div>{spec.chave}:</div>
                                    <div>{spec.valor}</div>
                                </div>    
                            )}
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
                                <textarea cols="30" rows="10" placeholder="Gostaria de dizer um pouco mais?" value={comentario} onChange={e => setComentario(e.target.value)}></textarea>
                                <button onClick={postAvaliacao}>Postar</button>
                            </div>
                        </div>
                    </div>

                    <div className="container-comentarios">
                        <h2>Avaliações</h2>
                            
                        {avaliacoes.map(avaliacao => 
                        <div>
                            <div className="container-comentario">
                                <div>
                                    <img src={avaliacao.imgCliente ? mostrarUrlImagem(avaliacao.imgCliente) : '/assets/images/usuario.png'} alt="" />
                                    <div>
                                        <h4>{avaliacao.nomeCliente}</h4>
                                        <h5>{formatarData(avaliacao.dataPostagem)}</h5>    
                                    </div>
                                </div>

                                <img src="/assets/images/estrelasRate.png" alt="" />

                                <p>{avaliacao.comentario}</p>
                                
                                {
                                    avaliacao.likes > 0 &&
                                    <p className="coment-likes">
                                        {avaliacao.likes} pessoas gostaram deste comentário
                                    </p>
                                }
                            </div>
                            
                            <button className={avaliacao.deuLike && 'liked'} onClick={() => handleLike(avaliacao)}>
                                <img src="/assets/images/icons/like.svg" alt="" />
                            </button>
                        </div>   
                        )
                        }
                        
                    </div>
                </section>
            </div>

            <Rodape/>
        </div>
    )
}