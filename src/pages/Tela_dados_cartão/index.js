import Cabecalho from "../../components/cabecalho";
import Rodape from "../../components/rodape";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.scss";
import { valorEmReais } from "../../api/funcoesGerais";
import { useContext, useState } from "react";
import ReactInputMask from "react-input-mask";
import { toast } from "react-toastify";
import storage, { set } from "local-storage";
import { cadastrarPedido } from "../../api/pedidoAPI";
import ToastCont from "../../components/toastContainer";
import { TemaContext } from "../../theme";

let codigoPix = (Math.random() * 1000000000).toFixed(0);

export default function Telacartao() {
  const [numCartao, setNumCartao] = useState("");
  const [nome, setNome] = useState("");
  const [bandeira, setBandeira] = useState("");
  const [escolhaCartao, setEscolhaCartão] = useState("");

  const [criandoPedido, setCriandoPedido] = useState(false);

  const context = useContext(TemaContext);
  let tema = context.tema;

  const location = useLocation();
  const navigate = useNavigate();

  if(!location.state.produtos) {
    navigate('/');
  }

  async function novoPedido() {
    let idPagamento;
    setCriandoPedido(true);

    try {
      if (escolhaCartao == "Cartão de crédito") idPagamento = 1;
      else if (escolhaCartao == "Cartão de débito") idPagamento = 2;
      else if (escolhaCartao == "PIX") idPagamento = 3; 
      else throw new Error("Método de pagamento obrigatório!");

      const usuario = storage("user-login").id;
      const carrinhoProdutos = location.state.produtos;
      let produtos = [];

      for (let i = 0; i < carrinhoProdutos.length; i++) {
        let carrinhoProduto = carrinhoProdutos[i];

        produtos[i] = {
          id: carrinhoProduto.id,
          preco: carrinhoProduto.precoReal,
          quantidade: carrinhoProduto.qtd,
        };
      }

      const totalCompra = escolhaCartao === 'PIX' ? location.state.valor * 0.85 : location.state.valor;

      let r = await cadastrarPedido(
        usuario,
        location.state.idEndereco,
        totalCompra,
        location.state.valorFrete,
        idPagamento,
        produtos
      );

      r.comprador = nome;
      r.metodoCompra = escolhaCartao;
      
      toast.success('Pagamento finalizado com sucesso =)');
      set('carrinho', []);

      setTimeout(() => {
        navigate('/checkout', {state: {infoPedido: r, produtos: location.state.produtos}});
      }, 3000)

      setCriandoPedido(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setCriandoPedido(false)
    }
  }

  return (
    <div className={"Tela-Cartao " + tema}>
      <Cabecalho />
      <ToastCont />
      <main>
        <img src="/assets/images/logo-transparente.png" alt="" />
        <div className="pagamento-cartao">
          <div className="dados-cartao">
            {escolhaCartao !== 'PIX' &&
              <ReactInputMask
                type="text"
                mask={"9999-9999-9999-9999"}
                value={numCartao}
                onChange={(e) => setNumCartao(e.target.value)}
                placeholder="Numero do cartão"
              />
            }
            
            {escolhaCartao !== 'PIX' &&
              <input
                type="text"
                onChange={(e) => setBandeira(e.target.value)}
                placeholder="Bandeira do cartão"
              />
            }

            {escolhaCartao === 'PIX' &&
              <div className="pix">
                <input type="text" readOnly value={codigoPix}/>
                <p>Você terá até 24h para pagar o PIX neste código.</p>
              </div>
            }
            
            <input
              type="text"
              onChange={(e) => setNome(e.target.value.toUpperCase())}
              placeholder="Nome do Titular"
            />

            <div className="escolhaCartao">
              <div>
                <input
                  type="radio"
                  onChange={(e) => setEscolhaCartão("Cartão de crédito")}
                  name="cartao"
                />
                <label>Cartão de crédito</label>
              </div>

              <div>
                <input
                  type="radio"
                  onChange={(e) => setEscolhaCartão("Cartão de débito")}
                  name="cartao"
                />
                <label>Cartão de débito</label>
              </div>

              <div>
                <input
                  type="radio"
                  onChange={(e) => setEscolhaCartão("PIX")}
                  name="cartao"
                />
                <label>PIX</label>
              </div>
            </div>

            <div className="bandeira-cartoes">
              <img src="/assets/images/Bandeiracartão.png" alt="" />
            </div>
          </div>
          <div className="resumo-pagamento">
            <div className="borda-resumo">
              <h1>RESUMO</h1>
              <div className="linha"></div>
              <div>
                <p>Produtos</p>
                <p>{valorEmReais(location.state.valor)}</p>
              </div>
              <div>
                <p>Frete</p>
                <p>{location.state.valorFrete}</p>
              </div>
              <div>
                <p className="total">Total</p>
                <p className="total">{valorEmReais(location.state.valor)}</p>
              </div>
              <div>
                <p className="pix">PIX:</p>
                <p className="pix">{valorEmReais(location.state.valor * 0.85)}</p>
              </div>

              <p>Até 15% de desconto no pix</p>
              <div className="linha2"></div>

              <h1>PAGAMENTO</h1>

              <div className="specs-pagamento">
                <p>Método:</p>
                <p>{escolhaCartao.toUpperCase()}</p>
              </div>

              {escolhaCartao !== 'PIX' &&
                <div className="specs-pagamento">
                  <p>Numero:</p>
                  <p>{numCartao.toUpperCase()}</p>
                </div>
              }
              
              {escolhaCartao !== 'PIX' &&
              <div className="specs-pagamento">
                <p>Rede:</p>
                <p>{bandeira.toUpperCase()}</p>
              </div>
              }

              <div className="specs-pagamento">
                <p>Nome do titular:</p>
                <p>{nome.toUpperCase()}</p>
              </div>

              <button className="finalizar-pedido" onClick={() => novoPedido()} disabled={criandoPedido}> 
                FINALIZAR PEDIDO
                
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                >
                  <g clip-path="url(#clip0_1166_990)">
                    <path
                      d="M12.2668 6.6992L9.03209 10.5468L7.89969 9.20041C7.79382 9.07441 7.66396 8.97033 7.51752 8.8941C7.37108 8.81787 7.21094 8.77099 7.04624 8.75614C6.88154 8.74129 6.7155 8.75876 6.5576 8.80755C6.3997 8.85634 6.25304 8.9355 6.12599 9.0405C5.99894 9.1455 5.89399 9.27428 5.81713 9.41951C5.74026 9.56474 5.693 9.72355 5.67802 9.8869C5.66305 10.0502 5.68066 10.2149 5.72986 10.3715C5.77906 10.5281 5.85887 10.6735 5.96474 10.7995L8.06462 13.2995C8.18264 13.4404 8.33047 13.5538 8.49762 13.6316C8.66477 13.7094 8.84714 13.7499 9.0318 13.75C9.21646 13.7501 9.39889 13.7099 9.56614 13.6323C9.73339 13.5546 9.88136 13.4415 9.99957 13.3008L14.2018 8.30077C14.3086 8.17486 14.3893 8.02928 14.4392 7.87238C14.4891 7.71548 14.5073 7.55034 14.4928 7.38644C14.4782 7.22254 14.4311 7.06311 14.3543 6.9173C14.2774 6.77148 14.1723 6.64215 14.0449 6.53672C13.9176 6.4313 13.7705 6.35185 13.6121 6.30295C13.4536 6.25404 13.2871 6.23664 13.1219 6.25173C12.9567 6.26683 12.7961 6.31413 12.6494 6.39092C12.5026 6.4677 12.3726 6.57247 12.2668 6.6992Z"
                      fill="white"
                    />
                    <path
                      d="M10.0833 0C8.08904 0 6.13953 0.58649 4.48134 1.6853C2.82314 2.78412 1.53074 4.3459 0.767553 6.17316C0.00436897 8.00043 -0.195315 10.0111 0.193753 11.9509C0.582821 13.8907 1.54316 15.6725 2.95334 17.0711C4.36352 18.4696 6.1602 19.422 8.11618 19.8078C10.0722 20.1937 12.0996 19.9957 13.9421 19.2388C15.7845 18.4819 17.3594 17.2002 18.4673 15.5557C19.5753 13.9112 20.1667 11.9778 20.1667 10C20.1638 7.3487 19.1006 4.8068 17.2102 2.93205C15.3198 1.0573 12.7567 0.00282354 10.0833 0ZM10.0833 17.5C8.58762 17.5 7.12548 17.0601 5.88184 16.236C4.63819 15.4119 3.66889 14.2406 3.0965 12.8701C2.52411 11.4997 2.37435 9.99168 2.66615 8.53682C2.95795 7.08196 3.67821 5.74559 4.73584 4.6967C5.79348 3.6478 7.14099 2.9335 8.60797 2.64411C10.0749 2.35472 11.5955 2.50325 12.9774 3.0709C14.3592 3.63856 15.5403 4.59985 16.3713 5.83322C17.2023 7.06659 17.6458 8.51664 17.6458 10C17.6437 11.9885 16.8462 13.8949 15.4284 15.3009C14.0106 16.707 12.0884 17.4978 10.0833 17.5Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1166_990">
                      <rect width="20.1667" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
      <Rodape />
    </div>
  );
}
