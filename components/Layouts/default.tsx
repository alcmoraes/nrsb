import React, { PureComponent, ReactNode } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

import { connect } from 'react-redux';
import { clearError, ErrorState, AuthState, authUser } from '../../reducers';
import { AppStore } from '../../interfaces';

import { Router } from '../../i18n';

interface Props extends AppStore {
  error?: typeof ErrorState;
  auth?: typeof AuthState;
  onClearErrors: () => void;
  onAuthUser: (p: any) => void;
}

class Index extends PureComponent<Props, Record<string, unknown>> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(nextProps: Props) {
    if (process.browser) {
      const { onAuthUser, auth } = nextProps;
      const credentials = localStorage.getItem('stored_credentials');
      if (!auth?.user.id && credentials) {
        onAuthUser(JSON.parse(credentials));
      } else if (!auth?.user.id && Router.asPath.indexOf('/auth') < 0) {
        // If user is not authenticated and it's outside /auth, send it to /auth
        Router.push('/auth');
      } else if (auth?.user.id && Router.asPath.indexOf('/auth') >= 0) {
        // If user is authenticated and is in /auth, send it to /
        Router.push('/');
      }
    }
    return {};
  }

  render(): ReactNode {
    const { children, auth } = this.props;

    return (
      <div className='wrapper'>
        <Snackbar
          open={Boolean(this.props.error)}
          message={this.props.error ? (this.props.error as Error).message : ''}
          autoHideDuration={1500}
          onClose={(_, reason) => (reason === 'timeout' ? this.props.onClearErrors() : null)}
        />
        {/* `process.browser prevents server to render non authenticated page` */}
        {process.browser ? (auth?.user.id || Router.asPath.indexOf('/auth') > -1 ? children : null) : null}
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    error: state.get('error'),
    auth: state.get('auth'),
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    onAuthUser: (p: any) => dispatch(authUser(p)),
    onClearErrors: () => dispatch(clearError()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
