import axios from "axios";

export async function simularEnvio(produto, cep, preco, ordenar) {
    let url = 'https://portal.kangu.com.br/tms/transporte/simular';

    let dados = {
        cepOrigem: "04852-506",
        cepDestino: cep,
        vlrMerc: preco,
        pesoMerc: produto.peso,
        produtos: [
          {
            peso: produto.peso,
            altura: 20,
            largura: 15,
            comprimento: 4,
            valor: preco,
            quantidade: 1
          }
        ],
        servicos: ["E", "X"],
        ordernar: ordenar
      };

    let resposta = await axios.post(url, dados, { headers: {
        token: '1ee4bf4ced3ba784a293d688abb162ac'
    }})

    return resposta.data;
}