  import './index.scss';

import Cabecalho from '../../components/cabecalho';
import Rodape from '../../components/rodape';

import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import storage from 'local-storage';
import { mostrarUrlImagem } from '../../api/produtoAPI';
import { trocarFotoPerfil } from '../../api/clienteAPI';

import { toast, ToastContainer } from 'react-toastify';
import { TemaContext } from '../../theme';

export default function Perfil() {

  const context = useContext(TemaContext);
  let tema = context.tema;


  const [infoUser, setInfoUser] = useState({});
  const [nascimento, setNascimento] = useState(new Date());
  const [img, setImg] = useState();

  const [atualizacao, setAtualizacao] = useState();
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let info = storage('user-login');

    if (info) {
      setInfoUser(info);
      setNascimento(new Date(info.dataNascimento));
      setImg(info.imgPerfil);
    } else {
    }
  }, [])

  function sair() {
    storage.remove('user-login');
    navigate('/');
  }

  async function fotoPerfil() {
    try {
      if(!carregando)
      {
        setCarregando(true);

        let resp = await trocarFotoPerfil(infoUser.id, img);

        if (resp.status === 204)
        {
          toast.success('Imagem alterada com sucesso! Faça login novamente.');
          storage.remove('user-login');
        }

        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }      
    } catch (error) {
      if (error.response)
        toast.error(error.response.data);
      else
        toast.error(error.message);

      setCarregando(false);
    }
  }

  function mostrarImagem() {
    if (typeof img === 'object')
      return URL.createObjectURL(img);
    else
      return mostrarUrlImagem(img);
  }

  return (
    <div className={'pagina-perfil ' + tema}>
      <Cabecalho />

      <ToastContainer
        position="bottom-center"
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

      <div className='secao'>
        <div className='perfil'>
          <div className='ladoEsq'>
            <div className='imagem'>
              <input type="file" id='inputImg' onChange={e => {
                setImg(e.target.files[0])
                setAtualizacao(true)
              }} />
              
              {!img ? <img src="/assets/images/usuario.png" alt="Insira uma foto de perfil!" onClick={(() => document.getElementById('inputImg').click())} /> :
                <img src={mostrarImagem(img)} alt="FotoPerfil" />}
            </div>

            <div className='trocaImg'>
              <button onClick={(() => document.getElementById('inputImg').click())}>Adicionar Imagem</button>
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

        {atualizacao && <button className='confirm-btn' onClick={fotoPerfil}>Confirmar mudanças</button>}
      </div>

      <Rodape />
    </div>
  )
}