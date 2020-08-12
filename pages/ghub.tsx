import * as React from 'react';
import { withTranslation } from '../i18n';

import { connect } from 'react-redux';

import { AppStore } from '../interfaces';
import { throwError, logoutUser } from '../reducers';
import { Button, TextField } from '@material-ui/core';

import { GHUser } from '../models';
import Layout from '../components/Layouts';
import { get } from '../lib/HTTP';
import { WithTranslation } from 'next-i18next';
import { UserCard } from '../components';

interface Props extends AppStore, WithTranslation {
  onThrowError: (err: Error) => void;
  onLogoutUser: () => void;
}

interface State {
  input: string;
  user: GHUser;
}

class IndexPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      input: '',
      user: new GHUser({}),
    };
  }

  static async getInitialProps() {
    return { namespacesRequired: ['ghub'] };
  }

  async lookupUser() {
    try {
      const user = await get(`/api/ghub/user?u=${this.state.input}`);
      this.setState({ user: new GHUser(user) });
    } catch (ERR) {
      const { onThrowError } = this.props;
      onThrowError(ERR);
    }
  }

  render() {
    const { t } = this.props;

    return (
      <Layout>
        <div className='container mt-5'>
          <div>
            <div className='text-center row'>
              <div className='col-lg-12'>
                <TextField
                  value={this.state.input}
                  onChange={e => this.setState({ input: e.target.value })}
                  id='outlined-basic'
                  label='@username'
                  variant='outlined'
                />
              </div>
              <div className='col-lg-12 mt-2'>
                <Button variant='contained' color='primary' onClick={this.lookupUser.bind(this)}>
                  {t('lookup_github_user')}
                </Button>
              </div>
            </div>
            <hr />
            <UserCard user={this.state.user} />
          </div>
        </div>
      </Layout>
    );
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    onThrowError: (err: Error) => dispatch(throwError(err)),
    onLogoutUser: () => dispatch(logoutUser()),
  };
}

export default connect(null, mapDispatchToProps)(withTranslation('ghub')(IndexPage));
