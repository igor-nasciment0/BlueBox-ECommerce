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

            <div className="bandeira-cartões">
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

              <button></button>
            </div>
          </div>
        </div>
      </main>
      <Rodape />
    </div>
  );
}
