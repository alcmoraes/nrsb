import React from 'react';
import Joi from 'joi';
import TextField from '@material-ui/core/TextField';
import { WithTranslation } from 'next-i18next';
import { NextPage } from 'next';
import { joiResolver } from '@hookform/resolvers';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';

import { withTranslation } from '../i18n';
import { authUser, AuthUserSignature } from '../reducers';
import Layout from '../components/Layouts';
import { Dispatch } from 'redux';

interface Props extends WithTranslation {
  onAuthUser: (auth: AuthUserSignature) => void;
}

const AuthPage: NextPage<Props> = ({ t, onAuthUser }: Props) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: joiResolver(
      Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    ),
  });

  return (
    <Layout>
      <div className='container login text-center mt-5'>
        <h1>{t('login')}</h1>
        <hr />
        <form onSubmit={handleSubmit(onAuthUser)}>
          <div className='row mt-5'>
            <div className='col-12 mt-5'>
              <TextField
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                inputRef={register}
                name='email'
                label={t('email').toLowerCase()}
                variant='outlined'
              />
            </div>
            <div className='col-12 mt-2'>
              <TextField
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                inputRef={register}
                type='password'
                name='password'
                label={t('password').toLowerCase()}
                variant='outlined'
              />
            </div>
            <div className='col-lg-12 mt-2'>
              <Button variant='contained' color='primary' type='submit'>
                {t('login')}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onAuthUser: (payload: AuthUserSignature) => dispatch(authUser(payload)),
  };
}

export default connect(null, mapDispatchToProps)(withTranslation('auth')(AuthPage));
