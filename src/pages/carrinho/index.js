import "./index.scss";

import Cabecalho from "../../components/cabecalho/";
import Rodape from "../../components/rodape/";
import { useContext } from "react";
import { TemaContext } from "../../theme";
import { buscarImagemPrimaria } from "../../api/produtoAPI";
import { useState } from "react";
import { useEffect } from "react";
import { get, set } from "local-storage";
import ProdutoCarrinho from "./produtoCarrinho";
import { valorEmReais } from "../../api/funcoesGerais";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import InputMask from 'react-input-mask';
import { buscarCEP, calcularFreteCarrinho, descobrirCep } from "../../api/envioAPI";
import ToastCont from "../../components/toastContainer";
import { buscarEndereco, inserirEndereco, mudarEndereco } from "../../api/enderecoAPI";

export default function Carrinho() {
  const context = useContext(TemaContext);
  let tema = context.tema;

  const navigate = useNavigate();

  const [totalProdutos, setTotalProdutos] = useState(0);
  const [frete, setFrete] = useState(0);
  const [entEscolhida, setEntEscolhida] = useState();
  const [produtosCarrinho, setProdutosCarrinho] = useState([]);

  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [bairro, setBairro] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');

  const [preenchendoEndereço, setPreenchendoEndereco] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [entregas, setEntregas] = useState([]);

  async function buscaCarrinho() {
    let carrinho = get("carrinho");

    if (!carrinho) {
      carrinho = [];
      set("carrinho", []);
    }

    for (let i = 0; i < carrinho.length; i++) {
      let produto = carrinho[i];
      let img = await buscarImagemPrimaria(produto.id);
      produto.img = img.url;
    }

    setProdutosCarrinho(carrinho);
  }

  async function buscaEndereco() {
    let cliente = get('user-login');

    if(cliente.idEndereco) {
      let endereco = await buscarEndereco(cliente.idEndereco);
      console.log(endereco);

      setCep(endereco.cep);
      setCidade(endereco.cidade);
      setEstado(endereco.estado);
      setBairro(endereco.bairro);
      setLogradouro(endereco.logradouro);
      setNumero(endereco.numero);

      setPreenchendoEndereco(true)
    }
  }

  async function atualizarEndereco() {
    let atualizar = false;

    let cliente = get('user-login');

    if(cliente.idEndereco) {
      let endereco = await buscarEndereco(cliente.idEndereco);
      
      atualizar = cep !== endereco.cep ||
                  cidade !== endereco.cidade ||
                  estado !== endereco.estado ||
                  bairro !== endereco.bairro ||
                  logradouro !== endereco.logradouro ||
                  Number(numero) !== Number(endereco.numero);
    } else {
      atualizar = true;
    }

    if(atualizar) {
      try {
        let novoEndereco = await inserirEndereco(cep, estado, cidade, bairro, logradouro, numero);

        await mudarEndereco(cliente.id, novoEndereco.idEndereco);

        cliente.idEndereco = novoEndereco.idEndereco;

        set('user-login', cliente);
        
      } catch (error) {
        console.log(error);
      }  
    }
  }
 
  async function buscarFretes() {
    setCarregando(true);

    try {
      if (cidade && estado && bairro && logradouro && numero) {

        let entregasPossiveis;

        if (!cep) {
          let c = await descobrirCep(cidade, estado, logradouro);
          entregasPossiveis = await calcularFreteCarrinho(produtosCarrinho, c);

        } else {
          entregasPossiveis = await calcularFreteCarrinho(produtosCarrinho, cep);
        }

        setEntregas(entregasPossiveis);
      }
    } catch (error) {
      console.log(error);
      toast.error('Não foi possível buscar os fretes. Tente novamente mais tarde.')
    }

    setCarregando(false);
  }

  async function setEnderecoCEP() {
    try {
      let endereco = await buscarCEP(cep);

      if (endereco.erro)
        throw new Error('CEP inválido')

      setCidade(endereco.localidade);
      setEstado(endereco.uf);
      setBairro(endereco.bairro);
      setLogradouro(endereco.logradouro);

      setPreenchendoEndereco(true);

    } catch (error) {
      console.log(error);

      if (error.response) {
        toast.error(error.response.data);
      } else {
        toast.error(error.message);
      }
    }
  }

  useEffect(() => {
    let login = get("user-login");

    /*     if(!login) {
      navigate('/login')
    } */

    buscaCarrinho();
    buscaEndereco();
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

  useEffect(() => {
    buscarFretes();
  }, [cidade, estado, bairro, logradouro, numero])

  const toComponentB = () => {
    navigate("/pagamento", { state: { precoProdutos: totalProdutos, frete: frete, endereco: {cep: cep,
                                                                                             estado: estado,
                                                                                             cidade: cidade,
                                                                                             bairro: bairro,
                                                                                             logradouro: logradouro,
                                                                                             numero: numero} } });
  };

  return (
    <div className={"pagina-carrinho " + tema}>
      <Cabecalho />
      <ToastCont />

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
                <p>{valorEmReais(totalProdutos + frete)}</p>
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
                <p>{valorEmReais(frete)}</p>
              </div>
            </div>

            <div className="sec-total-input">
              {produtosCarrinho.length >= 1 ?
                <div>
                  <p>Escolha a forma de entrega</p>

                  <div className="input">
                    <InputMask
                      placeholder="Digite seu CEP"
                      mask="99999-999"
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                    />
                    <button onClick={setEnderecoCEP}>
                      <img src="/assets/images/icons/arrow-right.svg" alt="" />
                    </button>
                  </div>

                  {!preenchendoEndereço && <button onClick={() => setPreenchendoEndereco(true)}>Não sei meu CEP</button>}
                </div>

                :

                <div className="adicione-produtos">
                  <p>Adicione produtos ao seu carrinho, ou clique em "Comprar", para prosseguir daqui.</p>
                </div>
              }


              {preenchendoEndereço && produtosCarrinho.length >= 1 &&
                <div className="campos-endereco">
                  <section>
                    <div>
                      <h4>Cidade</h4>
                      <input type="text" value={cidade} onChange={e => setCidade(e.target.value)} />
                    </div>

                    <div>
                      <h4>UF</h4>
                      <input type="text" value={estado} onChange={e => setEstado(e.target.value)} />
                    </div>
                  </section>

                  <div>
                    <h4>Bairro</h4>
                    <input type="text" value={bairro} onChange={e => setBairro(e.target.value)} />
                  </div>

                  <section>
                    <div>
                      <h4>Logradouro</h4>
                      <input type="text" value={logradouro} onChange={e => setLogradouro(e.target.value)} />
                    </div>

                    <div>
                      <h4>Nº</h4>
                      <input type="text" value={numero} onChange={e => {if(!isNaN(Number(e.target.value))) setNumero(Number(e.target.value))}} />
                    </div>
                  </section>
                </div>
              }
            </div>

            <div className="container-entregas">
              {carregando &&
                <div className="carregando">
                  <img src="/assets/images/BeanEater.gif" alt="Carregando..."  />
                </div>
              }

              {!carregando && entregas.map((entrega, index) =>
                  <div onClick={() => { setFrete(entrega.vlrFrete); setEntEscolhida(index); }}
                    style={{ boxShadow: index === entEscolhida && "0 0 4px 2px var(--azul-claro)" }}
                  >
                    <img
                      src={entrega.url_logo}
                      alt="Ícone Transportadora"
                    />
                    <div>
                      <h3>{entrega.transp_nome}</h3>
                      <p>Receba em até {entrega.prazoEnt} dias úteis</p>
                      <h4>{valorEmReais(entrega.vlrFrete)}</h4>
                    </div>
                  </div>
                )}
            </div>

            <button
              disabled={produtosCarrinho.length > 1 || frete === 0}
              onClick={() => {
                atualizarEndereco();
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
