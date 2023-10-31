import "./index.scss";

import Cabecalho from "../../components/cabecalho";
import Rodape from "../../components/rodape";
import CardProduto from "../../components/cardProduto";

import { redirect, useParams } from "react-router-dom/dist";
import { useContext, useEffect, useState } from "react";
import { TemaContext } from "../../theme";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { useNavigate } from "react-router-dom/dist";
import {
  buscarImagens,
  buscarProdutoPorID,
  buscarProdutos,
  buscarRelacionados,
  mostrarUrlImagem,
} from "../../api/produtoAPI";

import {
  formatarData,
  separarEspecificacoes,
  separarTexto,
  valorEmReais,
} from "../../api/funcoesGerais";

import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

import { toast, ToastContainer } from "react-toastify";
import {
  buscarAvaliacoes,
  darLike,
  deletarAvaliacao,
  postarAvaliacao,
  tirarLike,
  verificarLike,
  verificarNumeroLikes,
} from "../../api/avaliacaoAPI";
import { get, set } from "local-storage";

import Rating from "@mui/material/Rating";

import { simularFrete } from "../../api/envioAPI";
import InputMask from "react-input-mask";

export default function Produto() {
  const context = useContext(TemaContext);
  let tema = context.tema;

  const idProduto = useParams().id;
  const idCliente = get("user-login") !== null && get("user-login").id;

  const [produto, setProduto] = useState({});
  const [imagemPrincipal, setImagemPrincipal] = useState({});
  const [imagensSecundarias, setImagensSecundarias] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const [precoReal, setPrecoReal] = useState(10);
  const [preco, setPreco] = useState(0);
  const [especificacoes, setEspecificacoes] = useState([]);
  const [descricao, setDescricao] = useState([]);

  const [produtosRelacionados, setProdutosRelacionados] = useState([]);

  const [avaliacoes, setAvaliacoes] = useState([]);
  const [comentario, setComentario] = useState("");
  const [avaliando, setAvaliando] = useState(false);
  const [notaIndex, setNotaIndex] = useState(-1);
  const [nota, setNota] = useState(0);
  const [notaGeral, setNotaGeral] = useState(3.8);
  const [numAvaliacoes, setNumAvaliacoes] = useState(0);

  const avaliacoesTextos = [
    "Detestei",
    "Não gostei",
    "Razoável",
    "Bom",
    "Adorei!",
  ];

  const [cep, setCep] = useState("");
  const [entregas, setEntregas] = useState([]);

  async function buscarProduto() {
    try {
      let p = await buscarProdutoPorID(idProduto);
      
      if(!p.id) {
        navigate('/404');
      }
      
      setProduto(p);

      let arrayProvisorio = [];

      let imagens = await buscarImagens(idProduto);
      for (let i = 0; i < imagens.length; i++) {
        let imagem = imagens[i];

        if (imagem.primaria) setImagemPrincipal(imagem);
        else arrayProvisorio.push(imagem);
      }

      setImagensSecundarias(arrayProvisorio);
    } catch (error) {
      redirect("/");
      toast.error("Ocorreu um erro ao carregar o produto");
    }
  }

  async function buscarRatings() {
    try {
      let ratings = await buscarAvaliacoes(idProduto);

      let mediaNotas = 0;

      for (let i = 0; i < ratings.length; i++) {
        let r = ratings[i];
        mediaNotas += r.nota;

        let boolLike = await verificarLike(idCliente, r.id);
        let numLikes = await verificarNumeroLikes(r.id);

        r.deuLike = boolLike.deuLike;
        r.likes = numLikes.numeroLikes;
      }

      setNotaGeral(mediaNotas / ratings.length);
      setNumAvaliacoes(ratings.length);

      setAvaliacoes(ratings);
    } catch (error) {
      if (error.response) {
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

      toast.success("Comentário adicionado. Obrigado pela contribuição!");

      setComentario("");

      setTimeout(() => window.location.reload(), 3000);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data);
      } else {
        toast.error(error.message);
      }
    }
  }

  async function excluirAvaliacao(idAvaliacao) {
    try {
      let r = await verificarNumeroLikes(idAvaliacao);

      for (let i = 0; i < r.likes.length; i++) {
        let like = r.likes[i];

        await tirarLike(like.idCliente, like.idAvaliacao);
      }

      await deletarAvaliacao(idAvaliacao);

      toast.success("Avaliação deletada com sucesso.");

      setTimeout(() => window.location.reload(), 3000);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data);
      } else {
        toast.error(error.message);
      }
    }
  }

  async function handleLike(avaliacao) {
    try {
      if (!get('user-login'))
        throw new Error('É preciso estar logado para deixar o like!')

      if (avaliacao.deuLike) {
        await tirarLike(idCliente, avaliacao.id);
      } else {
        await darLike(idCliente, avaliacao.id);
      }

      buscarRatings();
    } catch (error) {
      if (error.response) toast.info(error.response.data);
      else toast.info(error.message);
    }
  }

  async function simular() {
    try {
      if(cep.length !== 9) 
        throw new Error('CEP inválido')

      setCarregando(true);

      let entregas = await simularFrete(produto, cep, precoReal, "prazo");
      console.log(entregas);

      let entregaRapida = entregas.sort((a, b) => {
        return a.prazoEntMin - b.prazoEntMin;
      })[0];

      let entregaBarata = entregas.sort((a, b) => {
        return a.vlrFrete - b.vlrFrete;
      })[0];

      setEntregas([entregaRapida, entregaBarata]);
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.data.error) {
          toast.error(error.response.data.error.mensagem);
        } else {
          toast.error(error.response.data);
        }
      } else {
        toast.error(error.message);
      }
    }

    setCarregando(false);
  }

  async function buscarRelac() {
    try {
      let relacionados = await buscarRelacionados(produto);
      relacionados.sort(() => Math.random() - 0.5);
      setProdutosRelacionados(relacionados);
    } catch (error) {
      if (error.response) toast.error(error.response.data);
      else toast.error(error.message);
    }
  }

  function adicionarCarrinho() {
    let arrayCarrinho = get('carrinho');

    arrayCarrinho.push(produto);

    set('carrinho', arrayCarrinho);

    toast.success('Produto adicionado ao carrinho.')
  }

  useEffect(() => {
    buscarProduto();
    buscarRatings();
  }, [idProduto]);

  useEffect(() => {
    produto.promocao
      ? setPrecoReal(produto.valorPromocional)
      : setPrecoReal(produto.preco);

    setEspecificacoes(separarEspecificacoes(produto.especificacoes));
    setDescricao(separarTexto(produto.descricao));
    setPreco(produto.preco);

    buscarRelac();
  }, [produto]);

  function calcularDesconto(valorNormal, valorPromocao) {
    let desconto = ((valorNormal - valorPromocao) / valorNormal) * 100;
    return desconto.toFixed();
  }

  function trocarImagem(imgIndex) {
    setImagemPrincipal(imagensSecundarias[imgIndex]);

    let arrayProvisorio = [...imagensSecundarias];
    arrayProvisorio[imgIndex] = imagemPrincipal;
    setImagensSecundarias(arrayProvisorio);
  }

  const navigate = useNavigate();

  const toComponentB = () => {
    navigate('/pagamento', { state: { nome: produto.nome, valor: produto.preco, } });
  }

  return (
    <div className={"pagina-produto " + tema}>
      <Cabecalho />
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
            <div className="mobile-container-cima">
              <div className="imagens">
                <div className="cont-imagem-principal">
                  <div>
                    <InnerImageZoom
                      className="img-principal"
                      src={mostrarUrlImagem(imagemPrincipal.url)}
                      zoomScale={1.2}
                    />
                  </div>
                </div>

                <div className="cont-imagens-secundarias">
                  {imagensSecundarias.map((imagem, imgIndex) => (
                    <div>
                      <img
                        src={mostrarUrlImagem(imagem.url)}
                        onClick={() => trocarImagem(imgIndex)}
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="info">
                <h1>{produto.nome}</h1>
                {numAvaliacoes > 0 && (
                  <div className="avaliacao">
                    <Rating value={notaGeral} precision={0.5} readOnly />(
                    {numAvaliacoes} avaliações)
                  </div>
                )}

                <div className="preco">
                  <div>
                    {produto.promocao && <h3>De: {valorEmReais(preco)}</h3>}
                    <h2>{valorEmReais(precoReal)}</h2>
                    <h4>
                      Ou em até 10x de {valorEmReais(precoReal / 10 - 0.01)}
                    </h4>
                  </div>

                  {produto.promocao && (
                    <div className="desconto">
                      <h3>
                        {calcularDesconto(
                          produto.preco,
                          produto.valorPromocional
                        )}
                        % de Desconto
                      </h3>
                    </div>
                  )}
                </div>

                <div className="sobre">
                  <h4>Sobre</h4>
                  <p>
                    {produto.descricao && produto.descricao.slice(0, 270)}...
                  </p>
                  <AnchorLink href="#detalhes">Ver mais</AnchorLink>
                </div>

                <ul>
                  {especificacoes.map(
                    (spec, index) =>
                      index < 3 && (
                        <li>
                          {spec.chave}: <b>{spec.valor}</b>
                        </li>
                      )
                  )}
                </ul>
              </div>
            </div>

            <div className="entregas">
              <h2>{valorEmReais(precoReal)}</h2>
              <hr />

              <div className="input-cep">
                <h3>Descobrir formas de entrega</h3>
                <div>
                  <InputMask
                    placeholder="Digite seu CEP"
                    mask="99999-999"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                  />
                  <button onClick={simular}>
                    <img src="/assets/images/icons/arrow-right.svg" alt="" />
                  </button>
                </div>
              </div>

              <div className="carregando" style={{display: !carregando && 'none'}}>
                <img src="/assets/images/BeanEater.gif" alt="Carregando..." />
              </div>

              {entregas.length > 0 && (
                <div className="container-entregas">
                  {entregas[0].transp_nome === entregas[1].transp_nome ? (
                    <div className="entrega">
                      <h2>Entrega mais rápida e mais barata</h2>
                      <h3>Você tem sorte de encontrar uma dessas!</h3>

                      <div>
                        <img src={entregas[0].url_logo} alt="" />
                        <div>
                          <h4>Entrega {entregas[0].transp_nome}</h4>
                          <p>
                            Receba em cerca de {entregas[0].prazoEnt} dias úteis
                          </p>
                          <h5>R$ {entregas[0].vlrFrete}</h5>
                        </div>
                      </div>
                    </div>
                  ) : (
                    entregas.map((entrega, index) => (
                      <div className="entrega">
                        <h2>
                          Entrega mais {index === 0 ? "Rápida" : "Barata"}
                        </h2>

                        <div>
                          <img src={entrega.url_logo} alt="" />
                          <div>
                            <h4>Entrega {entrega.transp_nome}</h4>
                            <p>
                              Receba em cerca de {entrega.prazoEnt} dias úteis
                            </p>
                            <h5>R$ {entrega.vlrFrete}</h5>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              <button className="btn-comprar" onClick={() => { toComponentB() }}>Comprar agora</button>
              <button className="btn-carrinho">Adicionar ao carrinho</button>
            </div>
          </section>

          <section className="sec-relacionados">
            <h1>Relacionados</h1>

            <div className="container-produtos">
              <div>
                <CardProduto infoProduto={produtosRelacionados[0]} />
                <CardProduto infoProduto={produtosRelacionados[1]} />
              </div>

              <div>
                <CardProduto infoProduto={produtosRelacionados[2]} />
                <CardProduto infoProduto={produtosRelacionados[3]} />
              </div>
            </div>
          </section>

          <section className="sec-detalhes" id="detalhes">
            <h1>Informações</h1>

            {produto.usado && (
              <div className="info-usado">
                <h2>Importante</h2>
                <p>
                  Esse produto é usado. Garantimos sua perfeita
                  funcionabilidade. ;)
                </p>
                <h3>Garantimos para este jogo, console ou acessório:</h3>

                <ul>
                  <li>
                    Nada de riscos ou arranhões visíveis, funcionamento
                    perfeito.
                  </li>
                  <li>
                    Embalagem: Caixa original em ótimo estado, com mínimas
                    marcas de desgaste.
                  </li>
                  <li>
                    Manual: Manual de instruções incluído e em excelente
                    condição.
                  </li>
                </ul>

                <p>
                  Sendo um produto usado, as imagens podem não refletir seu
                  estado real.
                </p>
              </div>
            )}

            <div>
              <h2>Descrição do Produto</h2>

              {descricao.map((paragrafo) => (
                <p>{paragrafo}</p>
              ))}
            </div>

            <h2>Especificações</h2>
            <div className="tabela-especificacoes">
              {especificacoes.map((spec) => (
                <div className="linha">
                  <div>{spec.chave}:</div>
                  <div>{spec.valor}</div>
                </div>
              ))}
            </div>
          </section>
        </main>

        <section className="sec-comentarios">
          <div>
            <div className="avaliacao-geral">
              <h2>Avaliação Geral do Produto</h2>
              <h3>{notaGeral ? notaGeral.toFixed(1) : "0.0"}</h3>
              <Rating size="large" value={notaGeral} precision={0.5} readOnly />
              <h4>{numAvaliacoes} avaliações</h4>
            </div>
            <div className="container-avalie">
              <div>
                <h2>Já comprou este produto?</h2>
                <h3>Ajude os outros a saberem o que comprar.</h3>
                <Rating
                  size="large"
                  value={nota}
                  precision={0.5}
                  onChangeActive={(event, newValue) => {
                    setNotaIndex(newValue);
                  }}
                  onChange={(event, newValue) => {
                    if (!idCliente) {
                      toast.info(
                        "É preciso fazer login para deixar uma avaliação"
                      );
                    } else {
                      setAvaliando(true);
                      setNota(newValue);
                    }
                  }}
                />
                <p>{avaliacoesTextos[Math.ceil(notaIndex) - 1]}</p>
              </div>

              <div style={{ display: avaliando ? "flex" : "none" }}>
                <textarea
                  cols="30"
                  rows="10"
                  placeholder="Gostaria de dizer um pouco mais?"
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                ></textarea>
                <button onClick={postAvaliacao}>Postar</button>
              </div>
            </div>
          </div>

          {avaliacoes.length === 0 ? (
            <SemAvaliacoes />
          ) : (
            <div className="container-comentarios">
              <h2>Avaliações</h2>

              {avaliacoes.map((avaliacao) => (
                <div>
                  <div className="container-comentario">
                    <div>
                      <img
                        src={
                          avaliacao.imgCliente
                            ? mostrarUrlImagem(avaliacao.imgCliente)
                            : "/assets/images/usuario.png"
                        }
                        alt=""
                      />
                      <div>
                        <h4>{avaliacao.nomeCliente}</h4>
                        <h5>{formatarData(avaliacao.dataPostagem)}</h5>
                      </div>
                    </div>

                    <Rating
                      value={avaliacao.nota}
                      size="small"
                      precision={0.5}
                      readOnly
                    />

                    <p>{avaliacao.comentario}</p>

                    {avaliacao.likes > 0 && (
                      <p className="coment-likes">
                        {avaliacao.likes} pessoas gostaram deste comentário
                      </p>
                    )}

                    {idCliente === avaliacao.idCliente && (
                      <button
                        className="btn-excluir"
                        onClick={() => excluirAvaliacao(avaliacao.id)}
                      >
                        Excluir comentário
                      </button>
                    )}
                  </div>

                  <button
                    className={avaliacao.deuLike && "liked"}
                    onClick={() => handleLike(avaliacao)}
                  >
                    <img src="/assets/images/icons/like.svg" alt="" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <Rodape />
    </div>
  );
}

function SemAvaliacoes() {
  return (
    <div className="cont-sem-avaliacoes">
      <h3>Parece que ninguém avaliou este produto ainda.</h3>
      <h4>Seja o primeiro!</h4>
      <div>
        <img src="/assets/images/backgrounds/link-confused-2.png" alt="" />
      </div>
    </div>
  );
}
