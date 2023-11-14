import "./index.scss";

import Cabecalho from "../../components/cabecalho/";
import Rodape from "../../components/rodape/";
import { useContext } from "react";
import { TemaContext } from "../../theme";
import { redirect, useLocation } from "react-router-dom";
import { buscarImagemPrimaria, mostrarUrlImagem } from "../../api/produtoAPI";
import { useState } from "react";
import { useEffect } from "react";
import { get, set } from "local-storage";
import ProdutoCarrinho from "./produtoCarrinho";
import { valorEmReais } from "../../api/funcoesGerais";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function Carrinho() {
  const context = useContext(TemaContext);
  let tema = context.tema;

  const navigate = useNavigate();
  
  const [totalProdutos, setTotalProdutos] = useState(0);
  const [frete, setFrete] = useState(0);
  const [produtosCarrinho, setProdutosCarrinho] = useState([]);
  const [cep, setCep] = useState('');
  
  const [decidindoFrete, setDecidindoFrete] = useState(false);

  async function buscaInfo() {
    let carrinho = get("carrinho");

    if (!carrinho) {
      carrinho = [];
      set("carrinho", []);
    }

    for (let i = 0; i < carrinho.length; i++) {
      let produto = carrinho[i];
      let img = await buscarImagemPrimaria(produto.id);
      produto.img = img.url;
      produto.qtd = 1;
    }

    setProdutosCarrinho(carrinho);
  }

  async function buscarFretes() {
    try {

      
      
    } catch (error) {
      toast.error('Não foi possível buscar os fretes. Tente novamente mais tarde.')
    }
  }

  useEffect(() => {
    let login = get("user-login");

    /*     if(!login) {
      navigate('/login')
    } */

    buscaInfo();
  }, []);

  useEffect(() => {
    let t = 0;

    for (let i = 0; i < produtosCarrinho.length; i++) {
      let produto = produtosCarrinho[i];

      t =
        t +
        (produto.promocao ? produto.valorPromocional : produto.preco) *
          produto.qtd;
    }

    setTotalProdutos(t);
  }, [produtosCarrinho]);

  useEffect(() => {
    set('carrinho', produtosCarrinho)
  }, [produtosCarrinho])

  const toComponentB = () => {
    navigate("/pagamento", { state: { preco: totalProdutos } });
  };

  let disableProsseguir = produtosCarrinho.length > 1 ||
                          frete === 0;

  return (
    <div className={"pagina-carrinho " + tema}>
      <Cabecalho />

      <main>
        <h1>Meu Carrinho</h1>

        <div className="container-tela">
          <section className="sec-carrinho">
            <div className="container-carrinho">
              {produtosCarrinho.length === 0 && (
                <div className="msg-vazio">Seu carrinho está vazio!</div>
              )}

              {produtosCarrinho.map((produto, index) => (
                <ProdutoCarrinho
                  produto={produto}
                  resetar={() => setProdutosCarrinho([...produtosCarrinho])}
                  index={index}
                />
              ))}
            </div>
          </section>

          <section className="sec-total">
            <div className="sec-total-precos">
              <div className="total">
                <h3>Total:</h3>
                <p>{valorEmReais(totalProdutos)}</p>
              </div>

              {produtosCarrinho.map((produto) => (
                <div>
                  <h4>({produto.qtd} produtos)</h4>
                  <p>
                    {valorEmReais(
                      produto.qtd *
                        (produto.promocao
                          ? produto.valorPromocional
                          : produto.preco)
                    )}
                  </p>
                </div>
              ))}

              <div className="total-produtos">
                <h4>Produtos</h4>
                <p>{valorEmReais(totalProdutos)}</p>
              </div>

              <div className="frete">
                <h4>Frete</h4>
                <p>10.99</p>
              </div>
            </div>

            <div className="sec-total-input">
              <p>Escolha a forma de entrega</p>
              <input type="text" placeholder="Digite seu CEP" />
            </div>

            <div className="container-entregas">
              <div>
                <img
                  src="/assets/images/icons/loggi.svg"
                  alt="Ícone Transportadora"
                />
                <div>
                  <h3>Entrega Loggi</h3>
                  <p>Receba em até 2 dias úteis</p>
                  <h4>R$ 10.99</h4>
                </div>
              </div>
            </div>

            <button
              disabled={disableProsseguir}
              onClick={() => {
                toComponentB();
              }}

            >
              {" "}
              Prosseguir
            </button>
          </section>
        </div>
      </main>

      <Rodape />
    </div>
  );
}
