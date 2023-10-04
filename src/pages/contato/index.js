import { ToastContainer, toast } from 'react-toastify';
import Cabecalho from '../../components/cabecalho';
import Rodape from '../../components/rodape';
import emailjs from 'emailjs-com';
import { TemaContext } from '../../theme';

import './index.scss';
import { useContext } from 'react';

export default function Contato() {

    const context = useContext(TemaContext);
    const tema = context.tema;
    
    function mandarEmail(e) {
        e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it

        emailjs.sendForm('contato_servico', 'template_contato', e.target, 'Fmr5OPWsicQgWM0cy')
        .then((result) => {
            toast.success('Mensagem enviada com sucesso!')
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }, (error) => {
            toast.error(error.text);
            console.log(error.text);
        });
    }
    
    return (
        <div className={"pagina-contato " + tema}>
            <Cabecalho />
            <main>
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
                <h1>Precisa de ajuda?</h1>
                <h2>Preencha o formulário explicando o seu problema pra gente. :D</h2>

                <form onSubmit={mandarEmail}>
                    <div>
                        <h3>Nome Completo</h3>
                        <input type="text" name='from_name' required/>

                        <h3>Email</h3>
                        <input type="text" name='from_email' required/>

                        <h3>Assunto</h3>
                        <input type="text" placeholder='Ex: “Recebi um produto com defeito”.' name='from_subject' required/>

                        <h3>Explicação</h3>
                        <textarea placeholder='Pode explicar seu problema com detalhes. Nós nos esforçaremos para ajudar!' name='message' required/>
                    </div>

                    <input className='botao-submit' type="submit" value='Enviar'/>             
                </form>
            </main>
            <Rodape/>
        </div>
    )
}