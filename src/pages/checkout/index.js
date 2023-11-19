import "./index.scss";

import Cabecalho from "../../components/cabecalho";
import Rodape from "../../components/rodape";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { buscarEndereco } from "../../api/enderecoAPI";
import { formatarData, valorEmReais } from "../../api/funcoesGerais";
import { get } from "local-storage";
import { TemaContext } from "../../theme";

export default function Checkout() {

  const location = useLocation();
  const navigate = useNavigate();

  const [endereco, setEndereco] = useState({});
  const [infoPedido, setInfoPedido] = useState({});
  const [listaProdutos, setListaProdutos] = useState([]);
  const cliente = get('user-login');

  useEffect(() => {
    if (!location.state) {
      navigate('/');
    } else {
      setInfoPedido(location.state.infoPedido);
      setListaProdutos(location.state.produtos);
    }
  }, [])

  useEffect(() => {
    buscarInfo();
  }, [])

  async function buscarInfo() {
    let infoPedido = location.state.infoPedido;

    try {

      let endrc = await buscarEndereco(infoPedido.idEndereco);
      setEndereco(endrc);

    } catch (error) {
      console.log(error);
    }
  }

  const context = useContext(TemaContext);
  let tema = context.tema;

  return (
    <div className={"checkoutBody " + tema}>
      <Cabecalho />

      <div className="resumo">
        <h1>Checkout</h1>

        <img
          className="galinha"
          src="/assets/images/galinha.png"
          alt="Galinha"
        />

        <div className="compra">
          <div className="categorias">
            <div className="espacamento">
              <p>Produtos</p>
            </div>
            <div>
              <p>Qtd.</p>
            </div>
            <div>
              <p>Subtotal</p>
            </div>
          </div>
          {listaProdutos.map(produto =>
            <div className="conteudo">
              <div className="espacamento">
                <p>{produto.nome}</p>
              </div>
              <div>
                <p>{produto.qtd}</p>
              </div>
              <div className="valor">
                <p>{valorEmReais(produto.precoReal * produto.qtd)}</p>
              </div>
            </div>
          )}
          <div className="subtotal">
            {infoPedido.metodoCompra === 'PIX' &&
              <div>
                <p className="PIX">Como você pagou com PIX, seus produtos receberam 15% de desconto! ( ☞˙ᵕ˙)☞ </p>
              </div>
            }            
            <div>
              <p>Produtos:</p>
            </div>
            <div>
              <p className="espacamentoValor">{valorEmReais(infoPedido.valorProdutos)}</p>
            </div>
          </div>
          <div className="frete">
            <div>
              <p>Frete:</p>
            </div>
            <div>
              <p className="espacamentoValor">{valorEmReais(infoPedido.valorFrete)}</p>
            </div>
          </div>
          <div className="total">
            <div>
              <p>Total</p>
            </div>
            <div>
              <p className="espacamentoValor">{valorEmReais(infoPedido.valorFrete + infoPedido.valorProdutos)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="informacaoEntrega">
        <div className="entrega">
          <div className="tituloEntrega">
            <img src="/assets/images/icons/gps.svg" alt="" />
            <h2>Entrega</h2>
          </div>

          <div className="informacaoCliente">
            <p>{endereco.logradouro}</p>
          </div>

          <div className="casaCliente">
            <div>
              <p>{endereco.cep}</p>
            </div>
            <div className="alinhamentoNumero">
              <p>N° {endereco.numero}</p>
            </div>
          </div>

          <div className="informacaoCliente">
            <p>{cliente.nome + ' ' + cliente.sobrenome}</p>
          </div>
          <div className="informacaoCliente">
            <p>{cliente.telefone}</p>
          </div>
        </div>
        <div className="pagamento">
          <div className="tituloPagamento">
            <img src="/assets/images/icons/dinheiro.svg" alt="" />
            <h2>Pagamento</h2>
          </div>
          <div>
            <p>{infoPedido.comprador}</p>
          </div>
          <div>
            <p>{infoPedido.metodoCompra}</p>
          </div>
          <div>
            <p>Pagamento em {formatarData(new Date(), true)}</p>
          </div>
        </div>
      </div>

      <div className="agradecimento">
        <h1>Obrigado por comprar conosco!</h1>
        <Link to={"/"}>Voltar</Link>
      </div>

      <Rodape />
    </div>
  );
}
