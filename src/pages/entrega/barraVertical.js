import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';

const steps = [
  {
    img: '/assets/images/icons/checkBox.svg',
    label: 'Pagamento Aprovado',
    description: `23/07/2023`,
  },
  {
    img: '/assets/images/icons/prancheta.svg',
    label: 'Em preparação',
    description: '27/07/2023.',
  },
  {
    img: '/assets/images/icons/caminhao-de-entrega.svg',
    label: 'A caminho',
    description: `28/07/2023`,
  },
  {
    img: '/assets/images/icons/cara-feliz.svg',
    label: 'Entregue!',
    description: `29//07/2023`,
  }
];

export default function VerticalLinearStepper() {
  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={0} orientation="vertical">
        {steps.map(step => (
          <Step expanded={true}>
            <StepLabel>
              <img src={step.img} alt="" className="icons-entrega vertical"/>
            </StepLabel>
            <StepContent>
              <h4 className="titulo-step">{step.label}</h4>
              <p className='descricao-step'>{step.description}</p>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}