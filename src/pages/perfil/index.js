import './index.scss';

import Cabecalho from '../../components/cabecalho';
import Rodape from '../../components/rodape';

import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import storage from 'local-storage';

export default function Perfil()
{
  const [infoUser, setInfoUser] = useState({});
  const [nascimento, setNascimento] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    let info = storage('user-login');

    if(info) {
      setInfoUser(info);
      setNascimento(new Date(info.dataNascimento));
      console.log(info);
    } else {
      navigate('/login');
    }
  }, [])

  function sair() {
    storage.remove('user-login');
    navigate('/');
  }

  return (
    <div className='perfilBody'>
      <Cabecalho/>
      
      <div className='secao'>
        <div className='perfil'> 
          <div className='ladoEsq'>
            <div className='imagem'>
              <img src="/assets/images/pessoa-aleatoria.png" alt="FotoPerfil" />
            </div>

            <div className='trocaImg'>
              <button href="">Adicionar Imagem</button>
            </div>

            <Link href="">Trocar Senha</Link>
            <Link to={'/meus-pedidos'}>Meus Pedidos</Link>
            <button onClick={sair}>Sair</button>
          </div>

          <div className='barra'></div>
          
          <div className='ladoDir'>
            <h1>Meu Perfil</h1>

            <h3>Nome de usuário</h3>
            <div className='info'>
              <p>{`${infoUser.nome} ${infoUser.sobrenome}`}</p>
            </div>

            <h3>CPF</h3>
            <div className='info'>
              <p>{infoUser.cpf}</p>
            </div>

            <h3>E-mail</h3>
            <div className='infoTrocavel'>
              <div>
                <p>{infoUser.email}</p>
              </div>
              <a href="">Trocar</a>
            </div>

            <h3>Número de Telefone</h3>
            <div className='infoTrocavel'>
              <div>
                <p>{infoUser.telefone}</p>
              </div>
              <a href="">Trocar</a>
            </div>

            <h3>Data de Nascimento</h3>
            <div className='data'>
              <div>
                <p>{nascimento.getDate()}</p>
              </div>

              <div>
                <p>{nascimento.getMonth() + 1}</p>
              </div>

              <div>
                <p>{nascimento.getFullYear()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    <Rodape/>
  </div>
  )
}