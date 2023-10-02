import './index.scss';

import Cabecalho from '../../components/cabecalho';
import Rodape from '../../components/rodape';

import { Link } from 'react-router-dom';

export default function Perfil()
{
  return (
    <div className='perfilBody'>
      <Cabecalho/>
      
      <div className='secao'>
        
        <div className='perfil'> 
          <div className='ladoEsq'>
            <div className='imagem'>
              <img src="/assets/images/pessoa-aleatoria.png" alt="FotoPerfil" />
            </div>

            <a href="">Trocar Senha</a>
            <Link to={'/meus-pedidos'}>Meus Pedidos</Link>
            <a href="">Meus Cupons</a>
          </div>

          <div className='barra'></div>
          
          <div className='ladoDir'>
            <h1>Meu Perfil</h1>

            <h3>Nome de usuário</h3>
            <div>
              <p>Igão o maioral</p>
            </div>

            <h3>CPF</h3>
            <div>
              <p>3********4</p>
            </div>

            <h3>E-mail</h3>
            <div className='infoTrocavel'>
              <div>
                <p>blabla@gmail.com</p>
              </div>
              <a href="">Trocar</a>
            </div>

            <h3>Número de Telefone</h3>
            <div className='infoTrocavel'>
              <div>
                <p>119999999999</p>
              </div>
              <a href="">Trocar</a>
            </div>

            <h3>Data de Nascimento</h3>
            <div>
              <div>
                <p>01</p>
              </div>

              <div>
                <p>11</p>
              </div>

              <div>
                <p>1999</p>
              </div>
            </div>
          </div>
        </div>
    </div>
    
    <Rodape/>
  </div>
  )
}