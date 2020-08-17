import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@material-ui/core';
import { WithTranslation } from 'next-i18next';
import { NextPage } from 'next';

import { withTranslation } from '../i18n';
import Layout from '../components/Layouts';
import { UserCard } from '../components';
import { joiResolver } from '@hookform/resolvers';
import Joi from 'joi';

type Props = WithTranslation;

const GithubFetchPage: NextPage<Props> = ({ t }: Props) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: joiResolver(
      Joi.object({
        username: Joi.string().max(25).alphanum().required(),
      }),
    ),
  });
  const [data, setData] = useState<{ username?: string }>({ username: '' });

  return (
    <Layout>
      <div className='container mt-5'>
        <div>
          <form onSubmit={handleSubmit(setData)}>
            <div className='text-center row'>
              <div className='col-lg-12'>
                <TextField
                  error={Boolean(errors.username)}
                  helperText={errors.username?.message}
                  inputRef={register}
                  name='username'
                  label='@username'
                  variant='outlined'
                />
              </div>
              <div className='col-lg-12 mt-2'>
                <Button variant='contained' type='submit' color='primary'>
                  {t('lookup_github_user')}
                </Button>
              </div>
            </div>
          </form>
          <hr />
          {data.username ? <UserCard username={data.username} /> : null}
        </div>
      </div>
    </Layout>
  );
};

export default withTranslation('ghub')(GithubFetchPage);
