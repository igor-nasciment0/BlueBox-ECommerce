import BarraLateral from "../../../components/ADM/barraLateral";
import CabecalhoADM from "../../../components/ADM/cabecalho";
import "./index.scss";
import Graficobarra from "../../../components/graficos";

export default function Graficoreceita() {
  return (
    <div className="grafico-receita">
      <CabecalhoADM />
      <main>
        <BarraLateral />
        <div className="info-geral">
          <h1>Gráfico De Receita Gerada</h1>
          <div className="info-produto">
            <div>
              <img src="/assets/images/foto_produto.png" alt="" />
              <div className="textos-produto">
                <h1>
                  JOGO:<span>Assassins Creed Brotherhood (Seminovo) - PS3</span>
                </h1>
                <h1>
                  MARCA:<span> SONY</span>
                </h1>
                <h1>
                  CATEGORIA:<span> JOGO DE VIDEO GAME</span>
                </h1>
                <h1>
                  SALDO DO LUCRO:
                  <span> NEGATIVO</span>
                </h1>
              </div>
            </div>
            <h1 className="relatorio-titulo">RELATÓRIO</h1>

            <div className="container-relatorio">
              <div>
                <h1>conclusão</h1>
                <div className="linha"></div>
                <p className="desc-vendas">
                  O relatório de vendas do "God of War" revela um desempenho
                  excepcional ao longo do último trimestre, refletindo uma
                  demanda contínua por experiências de jogos imersivas e
                  envolventes. A estratégia de marketing robusta e a excelência
                  incontestável do jogo impulsionaram significativamente o
                  aumento das vendas. A renomada franquia "God of War"
                  consolidou sua posição como uma das séries de jogos mais
                  populares e amadas, atraindo tanto os fãs leais da série
                  quanto uma nova base de jogadores, ansiosos por explorar a
                  rica narrativa e a jogabilidade envolvente. O desempenho
                  notável do "God of War" no último trimestre evidencia não
                  apenas o sucesso atual, mas também sinaliza um futuro
                  promissor, com potencial para expansão e crescimento contínuos
                  no mercado de jogos eletrônicos.
                </p>
              </div>
              <Graficobarra />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
