import BarraLateral from "../../../components/ADM/barraLateral";
import CabecalhoADM from "../../../components/ADM/cabecalho";
import "./index.scss";

export default function Graficoreceita() {
  return (
    <div className="grafico-receita">
      <CabecalhoADM />
      <main>
        <BarraLateral />
        <div className="info-geral">
          <h1>Gráficos De Receita Gerada</h1>
          <div className="info-produto">
            <div>
              <img src="/assets/images/foto_produto.png" alt="" />
              <div className="textos-produto">
                <h1>
                  NOME DO JOGO: <span> GOD OF WAR</span>
                </h1>
                <h1>
                  MARCA: <span> SONY</span>
                </h1>
                <h1>
                  CATEGORIA: <span> JOGO DE VIDEO GAME</span>
                </h1>
                <h1>
                  SALDO DO LUCRO:
                  <span>
                    NEGATIVO
                  </span>
                </h1>
              </div>
            </div>
          </div>
          <h1></h1>
          <div></div>
        </div>
      </main>
    </div>
  );
}
