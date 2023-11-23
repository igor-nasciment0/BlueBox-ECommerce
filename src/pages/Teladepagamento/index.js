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
  const [cupomUsado, setCupomUsado] = useState(false);
  const [cupom, setCupom] = useState("");

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

      produto.precoReal = produto.promocao
        ? produto.valorPromocional
        : produto.preco;
      preco += produto.precoReal * produto.qtd;
    }

    setPrecoProdutos(preco);
    setProdutosCarrinho(carrinho);
  }

  function atualizarCarrinho() {
    let preco = 0;

    for (let i = 0; i < produtosCarrinho.length; i++) {
      let produto = produtosCarrinho[i];
      preco += produto.precoReal * produto.qtd;
    }

    console.log(preco);

    setPrecoProdutos(preco);
    setProdutosCarrinho([...produtosCarrinho]);
  }

  async function usarCupom() {
    try {

      if(cupomUsado) {
        throw new Error('Um cupom já foi usado.')
      }

      let cupomServiu = false;

      for (let i = 0; i < produtosCarrinho.length; i++) {
        let produto = produtosCarrinho[i];

        let resp = await verificarCupom(cupom, produto.id);

        if (resp.cupomServe) {
          cupomServiu = true;
          setCupomUsado(true);
          produto.precoReal =
            produto.precoReal - produto.precoReal * resp.desconto;
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
    let descontoPix = precoTotal - (precoTotal * 15) / 100;

    console.log(precoProdutos);

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
    <div className={"teladePagamento " + tema}>
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
                      <p>{valorEmReais(carrinho.precoReal * carrinho.qtd)}</p>
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
                  <p>Produtos</p>
                  <p>{valorEmReais(precoProdutos)}</p>
                </div>
                <div>
                  <p>Frete</p>
                  <p>{valorEmReais(location.state.frete)}</p>
                </div>
                <div>
                  <p className="total">Total</p>
                  <p className="total">
                    {valorEmReais(precoProdutos + location.state.frete)}
                  </p>
                </div>
                <div>
                  <p className="pix">Pix</p>
                  <p className="pix">
                    {valorEmReais(
                      (precoProdutos + location.state.frete) * 0.85
                    )}
                  </p>
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
                      <input
                        placeholder="Código do Cupom"
                        value={cupom}
                        onChange={(e) => setCupom(e.target.value)} 
                      />
                      <button onClick={usarCupom}>
                        <img
                          src="/assets/images/icons/arrow-right.svg"
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                }


                <button className="finalizar-pedido" onClick={pagarCredito}>
                  Prosseguir 
                  <svg fill="#ffffff" width="20" height="20" viewBox="0 0 200 200" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title></title><path d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Zm25-91.5-29,35L76,94c-4.5-3.5-10.5-2.5-14,2s-2.5,10.5,2,14c6,4.5,12.5,9,18.5,13.5,4.5,3,8.5,7.5,14,8,1.5,0,3.5,0,5-1l3-3,22.5-27c4-5,8-9.5,12-14.5,3-4,4-9,.5-13L138,71.5c-3.5-2.5-9.5-2-13,2Z"></path></g></svg>
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
