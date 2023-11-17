import Cabecalho from "../../components/cabecalho";
import Rodape from "../../components/rodape";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./index.scss";
import { useContext, useEffect, useState } from "react";
import { buscarImagemPrimaria, mostrarUrlImagem } from "../../api/produtoAPI";
import { get } from "local-storage";
import { valorEmReais } from "../../api/funcoesGerais";
import { TemaContext } from "../../theme";
import ReactInputMask from "react-input-mask";
import { toast } from "react-toastify";
import ToastCont from "../../components/toastContainer";
import { verificarCupom } from "../../api/cupomAPI";

export default function TeladePagamento() {
  const [produtosCarrinho, setProdutosCarrinho] = useState([]);
  const [precoProdutos, setPrecoProdutos] = useState(0);

  const [usandoCupom, setUsandoCupom] = useState(false);
  const [cupom, setCupom] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const context = useContext(TemaContext);
  let tema = context.tema;

  useEffect(() => {
    buscaInfo();
  }, []);

  async function buscaInfo() {
    let carrinho = get("carrinho");
    let preco = 0;

    if (!carrinho) {
    }

    for (let i = 0; i < carrinho.length; i++) {
      let produto = carrinho[i];
      let img = await buscarImagemPrimaria(produto.id);
      produto.img = img.url;

      produto.precoReal = produto.promocao ? produto.valorPromocional : produto.preco;
      preco += produto.precoReal;
    }

    setPrecoProdutos(preco);
    setProdutosCarrinho(carrinho);
  }

  function atualizarCarrinho() {
    let preco = 0;

    console.log(produtosCarrinho);

    for (let i = 0; i < produtosCarrinho.length; i++) {
      let produto = produtosCarrinho[i];
      preco += produto.precoReal;
      console.log(preco);
    }

    setPrecoProdutos(preco);
    setProdutosCarrinho([...produtosCarrinho]);
  }

  async function usarCupom() {
    try {

      let cupomServiu = false;

      for (let i = 0; i < produtosCarrinho.length; i++) {
        let produto = produtosCarrinho[i];

        let resp = await verificarCupom(cupom, produto.id);
        console.log(resp);

        if (resp.cupomServe) {
          cupomServiu = true;
          produto.precoReal = produto.precoReal - produto.precoReal * resp.desconto;
        }
      }

      atualizarCarrinho();

      if (cupomServiu)
        toast.success('O cupom foi aplicado a todos os produtos aplicáveis.')
      else
        toast.error('O cupom não é aplicável a nenhum dos produtos.')

    } catch (error) {
      if (error.response) {
        toast.error(error.response.data)
      } else {
        toast.error(error.message);
      }
    }
  }

  if(produtosCarrinho.length === 0) {
    navigate('/');
  }

  const pagarCredito = () => {
    const precoTotal = precoProdutos + location.state.frete;
    let descontoPix = precoTotal - (precoTotal * 15 / 100)

    let info = { 
      valor: precoProdutos, 
      valorPix: descontoPix, 
      valorFrete: location.state.frete, 
      produtos: produtosCarrinho, 
      idEndereco: location.state.idEndereco 
    };

    navigate("/tela-cartão", { state: info })
  }

  return (
    <div className={"teladePagamento " + tema} >
      <Cabecalho />
      <ToastCont />
      <main className="pedido">
        <div className="row-centralizer">
          <div className="info-pedido">
            <div className="encomendas">
              <h1>Pedido</h1>

              <div className="produtos">
                {produtosCarrinho.map((carrinho) => (
                  <div className="especs-pedido">
                    <img src={mostrarUrlImagem(carrinho.img)} alt="" />
                    <p>{carrinho.nome}</p>
                    <div>
                      <p>Qtd</p>
                      <p>{carrinho.qtd}</p>
                    </div>

                    <div>
                      <p>Subtotal</p>
                      <p>{valorEmReais(carrinho.precoReal)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bandeira-cartões">
              <img src="/assets/images/Bandeiracartão.png" alt="" />
            </div>
          </div>

          <div className="resumo-pedido">
            <div className="card-resumo">
              <div className="borda-resumo">
                <h1>Resumo</h1>
                <div className="linha"></div>
                <div>
                  <p>Subtotal</p>
                  <p>{valorEmReais(precoProdutos)}</p>
                </div>
                <div>
                  <p>Frete</p>
                  <p>{valorEmReais(location.state.frete)}</p>
                </div>
                <div>
                  <p className="total">Total</p>
                  <p className="total">{valorEmReais(precoProdutos + location.state.frete)}</p>
                </div>
                <div>
                  <p className="pix">Pix</p>
                  <p className="pix">{valorEmReais((precoProdutos + location.state.frete) * 0.85)}</p>
                </div>

                <p>Até 15% de desconto no pix</p>
                <div className="linha2"></div>

                <button className="cupom" onClick={() => setUsandoCupom(true)}>
                  Usar cupom{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="16"
                    viewBox="0 0 20 16"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_406_59)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.69 2.42425C12.69 2.9493 12.3113 3.37494 11.844 3.37494C11.3768 3.37494 10.998 2.9493 10.998 2.42425H2.53775V4.32512C3.58767 5.21013 4.2298 6.60678 4.2298 8.12835C4.2298 9.64993 3.58767 11.0466 2.53775 11.9316V13.8325H10.998C10.998 13.3074 11.3768 12.8818 11.844 12.8818C12.3113 12.8818 12.69 13.3074 12.69 13.8325H17.7662V11.9316C16.7163 11.0466 16.0741 9.64993 16.0741 8.12835C16.0741 6.60678 16.7163 5.21013 17.7662 4.32512V2.42425H12.69ZM19.4582 13.8325C19.4582 14.8826 18.7007 15.7338 17.7662 15.7338H2.53775C1.60326 15.7338 0.845703 14.8826 0.845703 13.8325V10.874L1.2681 10.5994C2.04801 10.0925 2.53775 9.15886 2.53775 8.12835C2.53775 7.09785 2.04801 6.16424 1.2681 5.65728L0.845703 5.38271V2.42425C0.845703 1.37416 1.60326 0.522888 2.53775 0.522888H17.7662C18.7007 0.522888 19.4582 1.37416 19.4582 2.42425V5.38271L19.0358 5.65728C18.2559 6.16424 17.7662 7.09785 17.7662 8.12835C17.7662 9.15886 18.2559 10.0925 19.0358 10.5994L19.4582 10.874V13.8325ZM11.844 11.9311C11.3768 11.9311 10.998 11.5055 10.998 10.9804C10.998 10.4554 11.3768 10.0297 11.844 10.0297C12.3113 10.0297 12.69 10.4554 12.69 10.9804C12.69 11.5055 12.3113 11.9311 11.844 11.9311ZM11.844 9.07904C11.3768 9.07904 10.998 8.6534 10.998 8.12835C10.998 7.60331 11.3768 7.17767 11.844 7.17767C12.3113 7.17767 12.69 7.60331 12.69 8.12835C12.69 8.6534 12.3113 9.07904 11.844 9.07904ZM11.844 6.22699C11.3768 6.22699 10.998 5.80135 10.998 5.2763C10.998 4.75126 11.3768 4.32562 11.844 4.32562C12.3113 4.32562 12.69 4.75126 12.69 5.2763C12.69 5.80135 12.3113 6.22699 11.844 6.22699Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_406_59">
                        <rect width="20" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>

                {usandoCupom &&
                  <div className="input-cupom">
                    <div>
                      <input placeholder="Código do Cupom" value={cupom} onChange={e => setCupom(e.target.value)} />
                      <button onClick={usarCupom}>
                        <img src="/assets/images/icons/arrow-right.svg" alt="" />
                      </button>
                    </div>
                  </div>
                }


                <button className="finalizar-pedido" onClick={pagarCredito}>
                  Prosseguir 
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_406_67)">
                      <path
                        d="M12.1655 6.6992L8.95746 10.5468L7.83441 9.20041C7.72941 9.07441 7.60063 8.97033 7.4554 8.8941C7.31017 8.81787 7.15136 8.77099 6.98801 8.75614C6.82467 8.74129 6.66 8.75876 6.50341 8.80755C6.34682 8.85634 6.20137 8.9355 6.07537 9.0405C5.94937 9.1455 5.84529 9.27428 5.76906 9.41951C5.69283 9.56474 5.64596 9.72355 5.63111 9.8869C5.61626 10.0502 5.63372 10.2149 5.68251 10.3715C5.7313 10.5281 5.81046 10.6735 5.91546 10.7995L7.99798 13.2995C8.11503 13.4404 8.26163 13.5538 8.4274 13.6316C8.59317 13.7094 8.77403 13.7499 8.95717 13.75C9.1403 13.7501 9.32122 13.7099 9.48709 13.6323C9.65296 13.5546 9.79971 13.4415 9.91694 13.3008L14.0844 8.30077C14.1903 8.17486 14.2704 8.02928 14.3199 7.87238C14.3694 7.71548 14.3875 7.55034 14.373 7.38644C14.3586 7.22254 14.3119 7.06311 14.2357 6.9173C14.1595 6.77148 14.0552 6.64215 13.9289 6.53672C13.8026 6.4313 13.6567 6.35185 13.4996 6.30295C13.3425 6.25404 13.1773 6.23664 13.0134 6.25173C12.8496 6.26683 12.6903 6.31413 12.5448 6.39092C12.3993 6.4677 12.2704 6.57247 12.1655 6.6992Z"
                        fill="#424242"
                      />
                      <path
                        d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17316C0.00433286 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8078C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C19.9972 7.3487 18.9427 4.8068 17.068 2.93205C15.1932 1.0573 12.6513 0.00282354 10 0ZM10 17.5C8.51664 17.5 7.0666 17.0601 5.83323 16.236C4.59986 15.4119 3.63857 14.2406 3.07091 12.8701C2.50325 11.4997 2.35473 9.99168 2.64411 8.53682C2.9335 7.08196 3.64781 5.74559 4.6967 4.6967C5.7456 3.6478 7.08197 2.9335 8.53683 2.64411C9.99168 2.35472 11.4997 2.50325 12.8701 3.0709C14.2406 3.63856 15.4119 4.59985 16.236 5.83322C17.0601 7.06659 17.5 8.51664 17.5 10C17.4978 11.9885 16.707 13.8949 15.3009 15.3009C13.8949 16.707 11.9885 17.4978 10 17.5Z"
                        fill="#424242"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_406_67">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>
            </div>

            <p>Rezam as lendas:</p>
            <p>
              {" "}
              “Um verdadeiro herói deverá colocar o cupom <strong>
                antes
              </strong>{" "}
              do método de pagamento.”
            </p>
            <img src="/assets/images/mago 1.png" alt="" />
          </div>
        </div>
      </main>
      <Rodape />
    </div>
  );
}
