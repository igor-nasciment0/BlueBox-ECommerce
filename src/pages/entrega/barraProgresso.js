import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import { formatarData } from '../../api/funcoesGerais';

export default function BarraProgresso({infoPedido}) {
  
  return (
    <div className='barra-progresso'>
      <BarraProgressoHorizontal infoPedido={infoPedido}/>
      <BarraProgressoVertical infoPedido={infoPedido}/>
    </div>
  )
}

function BarraProgressoVertical({infoPedido}) {

  let passoAtivo;

  if(infoPedido.idEstado != 4) {
    passoAtivo = infoPedido.idEstado - 1;
  } else {
    passoAtivo = infoPedido.idEstado;
  }

  const steps = [
    {
      img: '/assets/images/icons/checkBox.svg',
      label: 'Aguardando Aprovação',
      description: formatarData(infoPedido.dataCompra),
    },
    {
      img: '/assets/images/icons/prancheta.svg',
      label: 'Em preparação',
      description: formatarData(infoPedido.dataAprovacao),
    },
    {
      img: '/assets/images/icons/caminhao-de-entrega.svg',
      label: 'A caminho',
      description: formatarData(infoPedido.dataSaida),
    },
    {
      img: '/assets/images/icons/cara-feliz.svg',
      label: 'Entregue!',
      description: formatarData(infoPedido.dataEntrega),
      blue: true
    }
  ];

  return (
    <Box sx={{ maxWidth: 400 }} className="barra-vertical">
      <Stepper activeStep={passoAtivo} orientation="vertical">
        {steps.map(step => (
          <Step expanded={true}>
            <StepLabel>
              <img src={step.img} alt="" className="icons-entrega vertical" />
            </StepLabel>
            <StepContent>
              <h4 className="titulo-step" style={{color: step.blue && 'var(--azul-claro)'}}>{step.label}</h4>
              <p className='descricao-step'>{step.description}</p>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

function BarraProgressoHorizontal({infoPedido}) {

  let passoAtivo;

  if(infoPedido.idEstado != 4) {
    passoAtivo = infoPedido.idEstado - 1;
  } else {
    passoAtivo = infoPedido.idEstado;
    console.log(passoAtivo);
  }

  const steps = [
    {
      img: '/assets/images/icons/checkBox.svg',
      label: 'Aguardando Aprovação',
      description: formatarData(infoPedido.dataCompra),
    },
    {
      img: '/assets/images/icons/prancheta.svg',
      label: 'Em preparação',
      description: formatarData(infoPedido.dataAprovacao),
    },
    {
      img: '/assets/images/icons/caminhao-de-entrega.svg',
      label: 'A caminho',
      description: formatarData(infoPedido.dataSaida),
    },
    {
      img: '/assets/images/icons/cara-feliz.svg',
      label: 'Entregue!',
      description: formatarData(infoPedido.dataEntrega),
      blue: true
    }
  ];

  return (
    <Box sx={{ width: '100%' }} className="barra-horizontal">
      <Stepper activeStep={passoAtivo} alternativeLabel>
        {steps.map(step =>
          <Step>
            <StepLabel>
              <div className='passo-entrega'>
                <img src={step.img} className='icons-entrega' alt="" />

                <h4 style={{color: step.blue && 'var(--azul-claro)'}}>{step.label}</h4>
                <p>{step.description}</p>
              </div>
            </StepLabel>
          </Step>
        )}
      </Stepper>
    </Box>
  )
}