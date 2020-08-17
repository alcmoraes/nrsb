import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux';

import { clearError, ErrorState, AuthState, authUser, AuthUserSignature } from '../../reducers';
import { Router } from '../../i18n';
import { Dispatch } from 'redux';

interface Props {
  children?: React.ReactNode;
  error?: ErrorState;
  auth?: AuthState;
  onClearErrors: () => void;
  onAuthUser: (payload: { email: string; password: string }) => void;
}

const BaseLayout: NextPage<Props> = ({ error, auth, children, onClearErrors, onAuthUser }: Props) => {
  useEffect(() => {
    console.log(auth);
    const credentials = localStorage.getItem('stored_credentials');
    if (!auth?.user.id && credentials) {
      onAuthUser(JSON.parse(credentials));
    } else if (!auth?.user.id && Router.asPath.indexOf('/auth') < 0) {
      Router.push('/auth');
    } else if (auth?.user.id && Router.asPath.indexOf('/auth') >= 0) {
      Router.push('/');
    }
  }, [auth]);

  return (
    <div className='wrapper'>
      <Snackbar
        open={Boolean(error)}
        message={error ? (error as Error).message : ''}
        autoHideDuration={1500}
        onClose={(_, reason) => (reason === 'timeout' ? onClearErrors() : null)}
      />
      {process.browser ? (auth?.user.id || Router.asPath.indexOf('/auth') > -1 ? children : null) : null}
    </div>
  );
};

function mapStateToProps(state: any) {
  return {
    error: state.get('error'),
    auth: state.get('auth'),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onAuthUser: (payload: AuthUserSignature) => dispatch(authUser(payload)),
    onClearErrors: () => dispatch(clearError()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseLayout);
