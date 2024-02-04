import React from 'react';
import styles from './UserSocialNetworksInformation.module.css';
import Section from '../section/Section';
import { useSocialNetwork } from '@/hooks/socialNetwork/useSocialNetwork';
import Field from '@/components/ui/input/Field';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { SocialNetworkService } from '@/services/socialNetwork/socialNetwork.service';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import Loader from '@/components/ui/Loader/Loader';

const UserSocialNetworksInformation = () => {
  const { data } = useSocialNetwork();
  const { user, isLoading } = useTypedSelector(state => state.user);
  const { revalidateUser, login } = useActions();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<any> = (data: any) => {
    data.userId = user?.userId;

    SocialNetworkService.updateSocialNetwork(data).then(() => {
      revalidateUser(String(user?.userId));
      reset();
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <Section title='Социальные сети'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {data.map(value => {
            const link = user?.socialNetwork.find(
              network => network.socialNetworkId === value.socialNetworkId,
            )?.link;

            return (
              <Field
                text={value.socialNetworkName}
                key={value.socialNetworkId}
                {...register(`${value.socialNetworkId}`, { value: link })}
              />
            );
          })}
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
