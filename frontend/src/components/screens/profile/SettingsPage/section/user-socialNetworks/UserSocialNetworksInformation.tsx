import React from 'react';
import styles from './UserSocialNetworksInformation.module.css';
import Section from '../section/Section';
import { useSocialNetwork } from '@/hooks/socialNetwork/useSocialNetwork';
import Field from '@/components/ui/input/Field';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@mui/material';

const UserSocialNetworksInformation = () => {
  const { data } = useSocialNetwork();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<any> = (data: any) => {
    console.log(data);
    reset();
  };

  return (
    <div>
      <Section title='Социальные сети'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {data.map(value => (
            <Field
              text={value.socialNetworkName}
              key={value.socialNetworkId}
              {...register(`socialNetworks.${value.socialNetworkName}`)}
            />
          ))}
          <div className={styles.btns}>
            <Button color='secondary' variant='outlined' type='submit'>
              Сохранить
            </Button>
            <Button color='error' variant='outlined' onClick={() => reset()}>
              Сбросить
            </Button>
          </div>
        </form>
      </Section>
    </div>
  );
};

export default UserSocialNetworksInformation;
