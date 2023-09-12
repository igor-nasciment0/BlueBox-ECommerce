import './index.scss';

import Cabecalho from '../../components/cabecalho';
import FaixaCategorias from '../../components/faixa-categorias';
import Rodape from '../../components/rodape';

export default function Checkout()
{
  return (
    <div className='checkoutBody'>
      <Cabecalho />

      <div className='resumo'>
        <h1>Checkout</h1>

        <img src="/assets/images/galinha.png" alt="Galinha" />
        <div className='compra'>
          <div className='categorias'>
            <p>Produtos</p>
            <p>Quantidades</p>
            <p>Preço</p>
          </div>
          <div className='conteudo'>
            <p>Resident Evil 1 - PS1</p>
            <p>1</p>
            <p>R$29,90</p>
          </div>
          <div className='subtotal'>
            <p>subtotal:</p>
            <p>R$29,90</p>
          </div>
          <div className='frete'>
            <p>Frete</p>
            <p>R$0,00</p>
          </div>
        </div>
      </div>

      <div className='informacaoEntrega'>
        <div className='entrega'>

        </div>
        <div className='pagamento'>

        </div>
      </div>

      <div className='agradecimento'>
        <h1>Obrigado por comprar conosco!</h1>
        <a href="">Voltar</a>
      </div>

      <Rodape/>
    </div>
  )
}