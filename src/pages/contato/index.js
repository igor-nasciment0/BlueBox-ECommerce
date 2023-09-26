import Cabecalho from '../../components/cabecalho';
import Rodape from '../../components/rodape';
import emailjs from 'emailjs-com';

export default function Contato() {
    
    function mandarEmail(e) {
        e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it

        emailjs.sendForm('contato_servico', 'template_contato', e.target, 'Fmr5OPWsicQgWM0cy')
        .then((result) => {
            window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
        }, (error) => {
            console.log(error.text);
        });
    }
    
    return (
        <div className="pagina-contato">
            <Cabecalho />
            <main>
                <h1>Precisa de ajuda?</h1>
                <h2>Preencha o formulário explicando o seu problema pra gente. :D</h2>

                <form onSubmit={mandarEmail}>
                    <div>
                        <h3>Nome Completo</h3>
                        <input type="text" name='from_name'/>

                        <h3>Email</h3>
                        <input type="text" name='from_email'/>

                        <h3>Assunto</h3>
                        <input type="text" placeholder='Dê um breve título ao seu problema. Ex: “Recebi um produto com defeito”.' name='from_subject'/>

                        <h3>Explicação</h3>
                        <textarea placeholder='Pode explicar seu problema com detalhes. Nós nos esforçaremos para ajudar!' name='message'/>
                    </div>

                    <input type="submit" value='Enviar'/>             
                </form>
            </main>
            <Rodape/>
        </div>
    )
}