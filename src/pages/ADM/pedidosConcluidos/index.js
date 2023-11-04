import './index.scss';
import CabecalhoADM from '../../../components/ADM/cabecalho';
import BarraLateral from '../../../components/ADM/barraLateral';
import { useContext, useEffect, useState } from 'react';
import { TemaContext } from '../../../theme';
import { toast } from 'react-toastify';
import ToastCont from '../../../components/toastContainer';
import { buscarPedidoPorEstado, buscarProdutosPedido } from '../../../api/pedidoAPI';
import { formatarData } from '../../../api/funcoesGerais';

export default function PedidoConcluido() {

  const context = useContext(TemaContext);
  let tema = context.tema;

  const [pedidosConcluidos, setPedidosConcluidos] = useState([]);

  async function buscarPedidos() {
    try {

      let pedidos = await buscarPedidoPorEstado('4');

      setPedidosConcluidos(pedidos);

    } catch (error) {
      if (error.response)
        toast.error(error.response.data);
      else
        toast.error(error.message);
    }
  }

  useEffect(() => {
    buscarPedidos();
  }, [])

  return (
    <div className={'pagina-pedidos-concluidos ' + tema}>
      <CabecalhoADM />
      <main className='s1'>
        <BarraLateral />
        <div className='conteudo'>
          <ToastCont />

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
            
            {pedidosConcluidos.map(pedido => 
              <Pedido pedido={pedido}/>  
            )}

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

function Pedido({ pedido }) {
  const [produtos, setProdutos] = useState([]);

  async function buscarProdutos() {
    try {

      let produtos = await buscarProdutosPedido(pedido.id);

      setProdutos(produtos);

    } catch (error) {
      console.log(error);
      toast.error('Não foi possível carregar um ou mais pedidos corretamente.')
    }
  }

  useEffect(() => {
    buscarProdutos();
  }, [pedido])

  return (
    <div className='pedidos'>
      <div>
        <h6>{produtos.length} Produtos</h6>
      </div>
      <div>
        <p>Comprador</p>
        <h6>{pedido.nomeCliente + ' ' + pedido.sobrenomeCliente}</h6>
      </div>
      <div>
        <p>Data de Compra</p>
        <h6>{formatarData(pedido.dataCompra)}</h6>
      </div>
      <div>
        <p>Data de Entrega</p>
        <h6>{formatarData(pedido.dataEntrega)}</h6>
      </div>
      <img src="/assets/images/icons/adm/BotãoOlhar.svg" alt='Ver detalhes' />
      <img className='check' src="/assets/images/icons/adm/concluido.svg" alt="Pedido concluído" />
    </div>
  )
}