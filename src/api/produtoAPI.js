import {api} from './API_URL'; 

export async function buscarProdutos(busca, ordem, filtro) {
    let produtos = await api.get(`/produto?nome=${busca}&ordem=${ordem}&filtro=${filtro}`);

    return produtos.data;
}

export async function buscarRelacionados(produto) {

    let porCategoria = await buscarProdutos(produto.categoria);
    let porMarca = await buscarProdutos(produto.categoria);

    let relacionados = [...porCategoria, ...porMarca];

    for(let i = 0; i < relacionados.length; i++) {
        if(relacionados[i].id === produto.id) {
            relacionados.splice(i, 1)
            i--;
        }
    }

    return relacionados;
}

export async function buscarProdutoPorID(id) {
    let produto = await api.get('/produto/buscar/' + id);

    return produto.data;
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

    return resp;
}

export async function deletarProduto(id) {
    let resp = await api.delete('/produto/' + id)

    return resp;
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

export async function buscarImagemPrimaria(idProduto){
    let imagens = await buscarImagens(idProduto);

    for (let i = 0; i < imagens.length; i++) {
        let imagem = imagens[i];

        if(imagem.primaria) 
            return imagem;
    }
}

export async function buscarImagensSecundarias(idProduto){
    let imagens = await buscarImagens(idProduto);

    let arraySecundario = [];

    for (let i = 0; i < imagens.length; i++) {
        let imagem = imagens[i];

        if(!imagem.primaria) 
            arraySecundario.push(imagem);
    }

    return arraySecundario;
}