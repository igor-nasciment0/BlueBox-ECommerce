import './index.scss';
import CabecalhoADM from '../../../components/ADM/cabecalho';
import BarraLateral from '../../../components/ADM/barraLateral';

export default function PedidoConcluido() {
  return (
    <div className='pagina-pedidos-concluidos'>
      <CabecalhoADM />
      <div className='s1'>
        <BarraLateral />
        <div className='conteudo'>
          <h1></h1>
          <div className='ordenar'>
            <div>
              <p>Ordenar de A a Z:</p>
            </div>
          </div>
          <div className='pedidos-concluidos'>
            <div className='pedidos'>
              <div>
                <p>Produto</p>
                <h6>The Last of Us - PS3</h6>
              </div>
            </div>
            <div className='pedidos'>
              <div>
                <p>Qtd.</p>
                <h6>1</h6>
              </div>
            </div>
            <div className='pedidos'>
              <div>
                <p>Comprador</p>
                <h6>Bruno Fofo</h6>
              </div>
            </div>
            <div className='pedidos'>
              <div>
                <p>Data do Pedido</p>
                <h6>15/05/2023</h6>
              </div>
            </div>
            <div className='pedidos'>
              <div>
                <p>Data de Entrega</p>
                <h6>20/05/2023</h6>
              </div>
            </div>
            <img src="/assets/images/icons/adm/BotãoOlhar.svg" alt="Olho" />
            <img src="/assets/images/icons/adm/concluido.svg" alt="Certo" />
          </div>
          <div className='tudo'>
            <div className='verTudo'>
              <a href=""></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}