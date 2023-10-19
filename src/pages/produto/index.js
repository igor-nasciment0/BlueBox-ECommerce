import './index.scss';

import Cabecalho from '../../components/cabecalho';
import Rodape from '../../components/rodape';
import CardProduto from '../../components/cardProduto';

import { Link, redirect, useParams } from 'react-router-dom/dist';
import { useContext, useEffect, useState } from 'react';
import { TemaContext } from '../../theme';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { buscarImagens, buscarProdutoPorID, mostrarUrlImagem, separarDescricao, separarEspecificacoes } from '../../api/produtoAPI';

import ReactImageMagnify from 'react-image-magnify'
import {toast} from 'react-toastify';
import { buscarAvaliacoes } from '../../api/avaliacaoAPI';

export default function Pedido() {

    const context = useContext(TemaContext);
    let tema = context.tema;

    const id = useParams().id;

    const [produto, setProduto] = useState({});
    const [imagemPrincipal, setImagemPrincipal] = useState({});
    const [imagensSecundarias, setImagensSecundarias] = useState([]);

    const [precoReal, setPrecoReal] = useState(10);
    const [preco, setPreco] = useState(0);

    const [especificacoes, setEspecificacoes] = useState([]);
    const [descricao, setDescricao] = useState([]);

    const [avaliacoes, setAvaliacoes] = useState([]);

    const conversor = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    async function buscarProduto() {
        try {
            let p = await buscarProdutoPorID(id);
            setProduto(p);

            let arrayProvisorio = [];

            let imagens = await buscarImagens(id);
            for(let i = 0; i < imagens.length; i++) {
                let imagem = imagens[i];
                
                if(imagem.primaria)
                    setImagemPrincipal(imagem);
                else 
                    arrayProvisorio.push(imagem);
            }

            setImagensSecundarias(arrayProvisorio);
            setAvaliacoes(await buscarAvaliacoes(id))
        } catch (error) {
            redirect('/');
            toast.error('Ocorreu um erro ao carregar o produto');
        }
    }

    useEffect(() => {
        buscarProduto();
    }, [])

    useEffect(() => {
        produto.promocao ?
            setPrecoReal(produto.valorPromocional) :
            setPrecoReal(produto.preco)

        setEspecificacoes(separarEspecificacoes(produto.especificacoes));
        setDescricao(separarDescricao(produto.descricao));
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
            
            <div className="container-main">
                <main>
                    <section className="container-produto">
                        <div className='mobile-container-cima'>
                            <div className="imagens">
                                <div className="cont-imagem-principal">
                                    <ReactImageMagnify
                                        {...{
                                            smallImage: {
                                                src: mostrarUrlImagem(imagemPrincipal.url),
                                                isFluidWidth: true
                                            },
                                            largeImage : {
                                                src: mostrarUrlImagem(imagemPrincipal.url),
                                                width: 500,
                                                height: 500
                                            }
                                        }}
                                    />
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
                                <h3>Garantimos para este jogo:</h3>

                                <ul>
                                    <li>Disco: Sem riscos ou arranhões visíveis, funcionamento perfeito.</li>
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
                                <textarea cols="30" rows="10" placeholder="Gostaria de dizer um pouco mais?"></textarea>
                                <button>Postar</button>
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
                                        <h5>30 de Julho de 2023</h5>    
                                    </div>
                                </div>

                                <img src="/assets/images/estrelasRate.png" alt="" />

                                <p>Eu sou nego e não nego, aprovo esse produto</p>
                                <p className="coment-likes">29 pessoas gostaram deste comentário</p>
                            </div>
                            
                            <button>
                                <img src="/assets/images/icons/like.svg" alt="" />
                            </button>
                        </div>   
                        )}
                        
                    </div>
                </section>
            </div>

            <Rodape/>
        </div>
    )
}