import { useContext, useEffect, useState } from 'react';
import BarraLateral from '../../../components/ADM/barraLateral';
import CabecalhoADM from '../../../components/ADM/cabecalho';
import './index.scss';
import { TemaContext } from '../../../theme';
import { buscarPedidoPorEstado } from '../../../api/pedidoAPI';
import ToastCont from '../../../components/toastContainer';
import { toast } from 'react-toastify';
import { PedidoAguardando, PedidoCaminho, PedidoPreparo } from './pedidos';

export default function PedidoPendente() {

    const context = useContext(TemaContext);
    let tema = context.tema;

    const [aprovacao, setAprovacao] = useState([]);
    const [preparo, setPreparo] = useState([]);
    const [emEntrega, setEmEntrega] = useState([]);

    async function buscarPedidos() {
        try {
            let aprov = await buscarPedidoPorEstado('1');
            let emPreparo = await buscarPedidoPorEstado('2');
            let aCaminho = await buscarPedidoPorEstado('3');

            aprov.forEach(pedido => pedido.produtos = []);
            emPreparo.forEach(pedido => pedido.produtos = []);
            aCaminho.forEach(pedido => pedido.produtos = []);

            setAprovacao(aprov);
            setPreparo(emPreparo);
            setEmEntrega(aCaminho);

        } catch (error) {
            console.log(error);
            if (error.message) {
                toast.error(error.message)
            } else {
                toast.error('Não foi possível carregar os pedidos.')
            }
        }
    }

    useEffect(() => {
        buscarPedidos();
    }, []);

    return (
        <div className={'pagina-pedido-pendente ' + tema}>
            <CabecalhoADM />

            <div className='main'>
                <BarraLateral />
                <ToastCont />

                <div className='pedidos'>
                    <h1>Pedidos Pendentes</h1>

                    <p>Aguardando Aprovação</p>
                    <div className='aprovacao'>
                        {aprovacao.map(pedido =>
                            <PedidoAguardando pedido={pedido}/>
                        )}
                    </div>

                    <p>Em Preparo</p>
                    <div className='preparo'>
                        {preparo.map(pedido =>
                            <PedidoPreparo pedido={pedido}/>
                        )}
                    </div>

                    <p>A Caminho</p>
                    <div className='caminho'>
                        {emEntrega.map(pedido =>
                            <PedidoCaminho pedido={pedido}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}