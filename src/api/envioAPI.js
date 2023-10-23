import axios from "axios";

export async function simularEnvio(produto, cep, preco, ordenar) {
    let url = 'portal.kangu.com.br/tms/transporte/simular';

    let dados = {
        "cepOrigem": "04852-506",
        "cepDestino": cep,
        "vlrMerc": preco,
        "pesoMerc": produto.peso/100,
        "produtos": [
          {
            "peso": produto.peso/100,
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

      console.log(dados);

    let resposta = await axios.post(`https://cors-anywhere.herokuapp.com/${url}`, dados, { headers: {
        token: '1ee4bf4ced3ba784a293d688abb162ac',
        "Content-Type": 'application/json'
    }})

    return resposta.data;
}