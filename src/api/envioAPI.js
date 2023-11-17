import axios from "axios";

export async function simularFrete(produto, cep, preco, ordenar) {
    let url = 'https://portal.kangu.com.br/tms/transporte/simular';
    url = 'https://corsproxy.io/?' + encodeURIComponent(url);

    let dados = {
        "cepOrigem": "04852-506",
        "cepDestino": cep,
        "vlrMerc": preco,
        "pesoMerc": 5,
        "produtos": [
          {
            "peso": 5,
            "altura": 20,
            "largura": 15,
            "comprimento": 4,
            "valor": preco,
            "quantidade": 1
          }
        ],
        "servicos": ["E", "X"],
        "ordernar": ordenar
      };

    let resposta = await axios.post(url, dados, { headers: {
        token: '1ee4bf4ced3ba784a293d688abb162ac',
        "Content-Type": 'application/json'
    }})

    if(resposta.data.error) {
      throw new Error('CEP inválido.');
    }

    return resposta.data;
}

export async function calcularFreteCarrinho(produtos, cep) {
  let url = 'https://portal.kangu.com.br/tms/transporte/simular';
  url = 'https://corsproxy.io/?' + encodeURIComponent(url);

  let arrayProdutos = [];
  let preco = 0;
  let peso = 0;

  for(let i = 0; i < produtos.length; i++) {
    let produto = produtos[i];

    let produtoObject = {
      peso: produto.peso / 1000 * produto.qtd,
      altura: 20,
      largura: 15,
      comprimento: 4,
      valor: produto.preco,
      quantidade: produto.qtd
    }

    preco += produto.preco;
    peso += produto.peso / 1000;

    arrayProdutos.push(produtoObject);
  }

  let dados = {
      "cepOrigem": "04852-506",
      "cepDestino": cep,
      "vlrMerc": preco,
      "pesoMerc": peso,
      "produtos": arrayProdutos,
      "servicos": ["E", "X"],
    };

  let resposta = await axios.post(url, dados, { headers: {
      token: '1ee4bf4ced3ba784a293d688abb162ac',
      "Content-Type": 'application/json'
  }})

  return resposta.data;
}

export async function buscarCEP(cep) {
  let url = `https://viacep.com.br/ws/${cep}/json/`;

  let endereco = await axios.get(url);

  return endereco.data;
}

export async function descobrirCep(cidade, estado, logradouro) {
  let url = `https://viacep.com.br/ws/${estado}/${cidade}/${logradouro}/json/`;

  let cep = await axios.get(url);

  console.log(cep.data);

  return cep.data.cep;
}