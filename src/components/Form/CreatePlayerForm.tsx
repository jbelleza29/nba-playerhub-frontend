import React, { ReactElement } from 'react';

import FormBase, { FormBaseProps } from './Form';
import Step1 from './CreatePlayerSteps/Step1';
import Step2 from './CreatePlayerSteps/Step2';
import Step3 from './CreatePlayerSteps/Step3';
import './create-player-form.scss';
import ResultStep from './CreatePlayerSteps/ResultStep';

interface CreatePlayerFormProps extends FormBaseProps {
  currentStep: number;
}

export default function CreatePlayerForm({
  currentStep,
  form,
  onFinish
}: CreatePlayerFormProps): ReactElement {
  const steps = [
    <Step1 />,
    <Step2 />,
    <Step3 form={form} />,
    <ResultStep />
  ];
  
  return(
    <div className='create-player-form'>
      <FormBase form={form} onFinish={onFinish}>
        { steps[currentStep] }
      </FormBase>
    </div>
  )
}
