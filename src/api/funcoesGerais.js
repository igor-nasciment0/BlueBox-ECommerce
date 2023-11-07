export function separarEspecificacoes(strEspecificacoes) {
    let stringAtual = '';
    let spec = {};
    let array = [];

    for (let index in strEspecificacoes) {
        let char = strEspecificacoes.charAt(index);

        if (char === ':') {
            spec.chave = stringAtual;
            stringAtual = '';
        }
        else if (char === '\n') {
            spec.valor = stringAtual;
            stringAtual = '';

            array.push(spec);
            spec = {};
        } else if (Number(index) === strEspecificacoes.length - 1) {
            stringAtual += char;
            spec.valor = stringAtual;
            array.push(spec);
        } else {
            stringAtual += char;
        }
    }

    return array;
}

export function separarTexto(texto) {
    let stringAtual = '';
    let array = [];

    for (let index in texto) {
        let char = texto.charAt(index);

        if (char === '\n') {
            array.push(stringAtual);
            stringAtual = '';
        } if (Number(index) === texto.length - 1) {
            stringAtual += char;
            array.push(stringAtual);
        } else {
            stringAtual += char;
        }
    }

    return array;
}

export function formatarData(data, extenso) {

    if(!data) {
        return '';
    }

    let dataObject = new Date(data);
    let meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    if (extenso) {
        return `
            ${dataObject.getDate()} de
            ${meses[dataObject.getMonth()]} de
            ${dataObject.getFullYear()}
        `
    } else {
        return `
            ${dataObject.getDate()}/${dataObject.getMonth() + 1}/${dataObject.getFullYear()}
        `
    }
}

export function valorEmReais(valor) {
    const conversor = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    return conversor.format(Number(valor));
}

export function limitarString(string, limite) {
    if (string.length > limite) {
        return string.substring(0, limite) + '...';
    } else {
        return string;
    }
}