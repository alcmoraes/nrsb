import * as React from 'react'
import { i18n, withTranslation } from '../i18n'

import { connect } from 'react-redux'

import { AppStore } from '../interfaces';
import { throwError } from '../reducers';
import { Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';

import { GHUser } from '../models';
import Layout from '../components/Layouts';
import { get } from '../lib/HTTP';
import { WithTranslation } from 'next-i18next';
import { UserCard } from '../components';

interface Props extends AppStore, WithTranslation {
  onThrowError: (err: Error) => void
}

interface State {
  input: string,
  user: GHUser
}

class IndexPage extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      input: "",
      user: new GHUser({})
    }
    
  }

  static async getInitialProps() {
      return { namespacesRequired: [ 'index' ] };
  }

  async lookupUser() {
    try{
      let user = await get(`/api/ghub/user?u=${this.state.input}`);
      this.setState({ user: new GHUser(user) });
    } catch(ERR){
      let { onThrowError } = this.props;
      onThrowError(ERR);
    }
  }

  render() {

    const { t } = this.props;

    return (
      <Layout>
        <div className="container">
          <div className="jumbotron">
            <h1 className="text-center">{t('title')}</h1>
            <hr />
            <div className="row">
              <div className="col-lg-12 text-right">
                <ButtonGroup color="secondary">
                  <Button variant="contained" onClick={() => i18n.changeLanguage('br')}>br</Button>
                  <Button variant="contained" onClick={() => i18n.changeLanguage('en')}>en</Button>
                </ButtonGroup>
              </div>
              <div className="col-lg-12 text-right mt-3">
                <a target="_blank" href="https://github.com/alcmoraes/nrsb">
                  {t('more_on_github')}
                </a>
              </div>
            </div>
          </div>
          <div className="text-center row">
            <div className="col-lg-12">
              <TextField value={this.state.input} onChange={(e) => this.setState({ input: e.target.value })} id="outlined-basic" label="@username" variant="outlined" />
            </div>
            <div className="col-lg-12 mt-2">
              <Button variant="contained" color="primary" onClick={this.lookupUser.bind(this)}>{t('lookup_github_user')}</Button>
            </div>
          </div>
          <hr />
          <UserCard user={this.state.user} />
        </div>
      </Layout>
    )

  }

}

function mapDispatchToProps(dispatch: any) {
  return {
    onThrowError: (err: Error) => dispatch(throwError(err))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(withTranslation('index')(IndexPage))
