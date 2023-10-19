import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5033'
})

export async function buscarProduto(busca) {
    let produtos = await api.get('/produto?nome=' + busca);

    return produtos.data;
}

export async function buscarProdutoPorID(id) {
    let produto = await api.get('/produto/buscar/' + id);

    return produto
}

export async function cadastrarProduto(nomeProduto, preco, qtdEstoque, descricao, especificacoes, categoria, marca, usado, peso) {
    let cadastrarProduto = {
        nome: nomeProduto,
        preco: preco,
        estoque: qtdEstoque,
        descricao: descricao,
        especificacoes: especificacoes,
        categoria: categoria,
        marca: marca,
        usado: usado,
        peso: peso
    }

    let resp = await api.post('/produto', cadastrarProduto) 
    
    return resp.data;
}

export async function atualizarProduto(id, nomeProduto, preco, qtdEstoque, descricao, especificacoes, categoria, marca, usado, peso) {
    let infoProduto = {
        nome: nomeProduto,
        preco: preco,
        estoque: qtdEstoque,
        descricao: descricao,
        especificacoes: especificacoes,
        categoria: categoria,
        marca: marca,
        usado: usado,
        peso: peso
    }

    let resp = await api.put('/produto/' + id, infoProduto);

    return resp.data;
}

export async function deletarProduto(id) {
    let resp = await api.delete('/produto/' + id)

    return resp;
}

export function separarEspecificacoes(strEspecificacoes) {
    let stringAtual = '';
    let spec = {};
    let array = [];

    for(let index in strEspecificacoes) {
        let char = strEspecificacoes.charAt(index);

        if(char === ':') {
            spec.chave = stringAtual;
            stringAtual = '';
        } 
        else if (char === '\n') {
            spec.valor = stringAtual;
            stringAtual = '';

            array.push(spec);
            spec = {};
        } else if(Number(index) === strEspecificacoes.length - 1){
            stringAtual += char;
            spec.valor = stringAtual;
            array.push(spec);
        } else {
            stringAtual += char;
        }
    }

    return array;
}

export function separarDescricao(strDescricao) {
    let stringAtual = '';
    let array = [];

    for(let index in strDescricao) {
        let char = strDescricao.charAt(index);

        if(char === '\n') {
            array.push(stringAtual);
            stringAtual = '';
        } if(Number(index) === strDescricao.length - 1) {
            stringAtual += char;
            array.push(stringAtual);
        } else {
            stringAtual += char;
        }
    }

    return array;
}


export async function buscarImagens(idProduto) {
    let imagens = await api.get(`/produto/${idProduto}/imagem`);

    return imagens.data;
}

export function mostrarUrlImagem(url) {
    return api.getUri() + '/' + url;
}

export async function adicionarImagem(idProduto, primaria, imagem) {
    const formData = new FormData();
    formData.append('imagem', imagem);

    let resp = await api.post(`/produto/${idProduto}/imagem?primaria=${primaria}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return resp;
}

export async function excluirImagem(id) {
    let resp = await api.delete('/produto/imagem/' + id);
    return resp;
}


export async function buscarMarcas() {
    let marcas = await api.get('/produto/marca');
    
    return marcas.data;
}

export async function buscarCategorias() {
    let categorias = await api.get('/produto/categoria');
    
    return categorias.data;
}