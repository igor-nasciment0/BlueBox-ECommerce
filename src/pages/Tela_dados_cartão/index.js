import Cabecalho from "../../components/cabecalho/";
import Rodape from "../../components/rodape";
import "./index.scss";

export default function Telacartao() {
  return (
    <div className="Tela-Cartao">
      <Cabecalho />
      <main>
        <img src="/assets/images/logo-transparente.png" alt="" />
        <div className="pagamento-cartao">
          <div className="dados-cartao">
            <input type="text" placeholder="Numero do cartão" />
            <input type="text" placeholder="Nome" />
            <input type="text" placeholder="CEP" />
            <input type="text" placeholder="CPF" />

            <div className="bandeira-cartoes">
              <img src="/assets/images/Bandeiracartão.png" alt="" />
            </div>
          </div>
          <div className="resumo-pagamento">
            <div className="borda-resumo">
              <h1>RESUMO</h1>
              <div className="linha"></div>
              <div>
                <p>Subtotal</p>
                <p>29,90</p>
              </div>
              <div>
                <p>Frete</p>
                <p>29,90</p>
              </div>
              <div>
                <p className="total">Total</p>
                <p className="total">29,90</p>
              </div>
              <div>
                <p className="pix">Crédito:</p>
                <p className="pix">25,49</p>
              </div>

              <p>Até 15% de desconto no pix</p>
              <div className="linha2"></div>

              <h1>PAGAMENTO</h1>

              <div className="specs-pagamento">
                <p>Método:</p>
                <p>Cartão de Crédito</p>
              </div>

              <div className="specs-pagamento">
                <p>Numero:</p>
                <p>0000-0000-0000</p>
              </div>

              <div className="specs-pagamento">
                <p>Rede:</p>
                <p>Visa</p>
              </div>

              <div className="specs-pagamento">
                <p>Nome do titular:</p>
                <p>Carlos Henrique Da silva P.</p>
              </div>

              <button className="finalizar-pedido">
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
