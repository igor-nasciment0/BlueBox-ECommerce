import './index.scss';
import CabecalhoADM from '../../../components/ADM/cabecalho';
import BarraLateral from '../../../components/ADM/barraLateral';
import { useContext } from 'react';
import { TemaContext } from '../../../theme';

export default function PedidoConcluido() {

  const context = useContext(TemaContext);
  let tema = context.tema;

  return (
    <div className={'pagina-pedidos-concluidos ' + tema}>
      <CabecalhoADM />
      <main className='s1'>
        <BarraLateral />
        <div className='conteudo'>
          <h1>Pedidos Concluídos</h1>
          <div className='ordenar'>
              <select>
                <option value="0" key="">Ordenar Por</option>
              </select>
          </div>
          <div className='pedidos-concluidos'>
            <div className='pedidos'>
              <div>
                <h6>4 produtos</h6>
              </div>
              <div>
                <p>Comprador</p>
                <h6>Bruno Fofo</h6>
              </div>
              <div>
                <p>Data do Pedido</p>
                <h6>15/05/2023</h6>
              </div>
              <div>
                <p>Data de Entrega</p>
                <h6>20/05/2023</h6>
              </div>
              <img className="olhar" src="/assets/images/icons/adm/BotãoOlhar.svg" alt="Olho" />
              <img className='check' src="/assets/images/icons/adm/concluido.svg" alt="Certo" />
            </div>
            <div className='pedidos'>
              <div>
                <h6>4 produtos</h6>
              </div>
              <div>
                <p>Comprador</p>
                <h6>Bruno Fofo</h6>
              </div>
              <div>
                <p>Data do Pedido</p>
                <h6>15/05/2023</h6>
              </div>
              <div>
                <p>Data de Entrega</p>
                <h6>20/05/2023</h6>
              </div>
              <img className="olhar" src="/assets/images/icons/adm/BotãoOlhar.svg" alt="Olho" />
              <img className='check' src="/assets/images/icons/adm/concluido.svg" alt="Certo" />
            </div>
            
            
          </div>
          <div className='tudo'>
            <div className='verTudo'>
              <a href="">Ver Tudo</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}