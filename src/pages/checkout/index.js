import './index.scss';

import Cabecalho from '../../components/cabecalho';
import FaixaCategorias from '../../components/faixa-categorias';
import Rodape from '../../components/rodape';

import { Link } from 'react-router-dom';

export default function Checkout()
{
  return (
    <div className='checkoutBody'>
      <Cabecalho />

      <div className='resumo'>
        <h1>Checkout</h1>

        <img className='galinha' src="/assets/images/galinha.png" alt="Galinha" />
        <div className='compra'>
          <div className='categorias'>
            <div className='espacamento'>
            <p>Produtos</p>
            </div>
            <div>
            <p>Quantidades</p>
            </div>
            <div>
            <p>Preço</p>
            </div>
          </div>
          <div className='conteudo'>
            <div className='espacamento'>
              <p>Resident Evil 1 - PS1</p>
            </div>
            <div>
            <p>1</p>
            </div>
            <div className='valor'>
            <p>R$29,90</p>
            </div>
          </div>
          <div className='subtotal'>
            <div>
            <p>subtotal:</p>
            </div>
            <div>
            <p className='espacamentoValor'>R$29,90</p>
            </div>
          </div>
          <div className='frete'>
            <div>
            <p>Frete</p>
            </div>
            <div>
            <p className='espacamentoValor'>R$0,00</p>
            </div>
          </div>
          <div className='total'>
            <div>
              <p>Total</p>  
            </div>
            <div>
              <p className='espacamentoValor'>R$29,90</p>
            </div>
          </div>
        </div>
      </div>

      <div className='informacaoEntrega'>
        <div className='entrega'>
          <div className='tituloEntrega'>
            <img src="/assets/images/icons/gps.svg" alt="" />
            <h2>Entrega</h2>
          </div>

          <div className='informacaoCliente'>
            <p>Nome da Rua</p>
          </div>

          <div className='casaCliente'>
            <p>CEP</p>
            <p>Complemento</p>
            <p>N° da Casa</p>
          </div>

          <div className='informacaoCliente'>
            <p>Nome do Cliente</p>
          </div>
          <div className='informacaoCliente'>
            <p>Número de Telefone</p>
          </div>
          <div className='informacaoCliente'>
            <p>Código de Rastreio</p>
          </div>
        </div>
        <div className='pagamento'>
          <div className='tituloPagamento'>
            <img src="/assets/images/icons/dinheiro.svg" alt="" />
            <h2>Pagamento</h2>
          </div>

          <p>Número do Cartão</p>
          <p>Cupom</p>
          <p>Nome do Comprador</p>
          <p>Data de Compra</p>

          <div className='notaFiscal'>
            <a href=""></a>
            <img src="" alt="" />
          </div>
        </div>
      </div>

      <div className='agradecimento'>
        <h1>Obrigado por comprar conosco!</h1>
        <Link to={'/'}>Voltar</Link>
      </div>

      <Rodape/>
    </div>
  )
}