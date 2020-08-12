import * as React from 'react';
import { withTranslation } from '../i18n';

import { connect } from 'react-redux';

import { AppStore } from '../interfaces';
import { authUser } from '../reducers';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import Layout from '../components/Layouts';
import { WithTranslation } from 'next-i18next';

interface Props extends AppStore, WithTranslation {
  onAuthUser: (auth: { email: string; password: string }) => any;
}

interface State {
  email: string;
  password: string;
}

class IndexPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  static async getInitialProps() {
    return { namespacesRequired: ['index'] };
  }

  async authUser() {
    const { onAuthUser } = this.props;
    onAuthUser(this.state);
  }

  render() {
    const { t } = this.props;

    return (
      <Layout>
        <div className='container login text-center mt-5'>
          <h1>{t('login')}</h1>
          <hr />
          <div className='row mt-5'>
            <div className='col-12 mt-5'>
              <TextField
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
                id='email'
                label='email'
                variant='outlined'
              />
            </div>
            <div className='col-12 mt-2'>
              <TextField
                type='password'
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                id='password'
                label='password'
                variant='outlined'
              />
            </div>
            <div className='col-lg-12 mt-2'>
              <Button variant='contained' color='primary' onClick={this.authUser.bind(this)}>
                {t('login')}
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    auth: state.get('auth'),
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    onAuthUser: (payload: any) => dispatch(authUser(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('auth')(IndexPage));
