import * as React from 'react'
import { i18n, withTranslation, Link } from '../i18n'

import { connect } from 'react-redux'

import { AppStore } from '../interfaces';
import { throwError, logoutUser } from '../reducers';
import { Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';

import { GHUser } from '../models';
import Layout from '../components/Layouts';
import { get } from '../lib/HTTP';
import { WithTranslation } from 'next-i18next';
import { UserCard } from '../components';

interface Props extends AppStore, WithTranslation {
  onThrowError: (err: Error) => void,
  onLogoutUser: () => void
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
                <Link href="/ghub" as="/ghub">
                  <a>{t('ghub_user_fetcher')}</a>
                </Link>
                <br/>
                <Button onClick={this.props.onLogoutUser}>
                  {t('logout')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )

  }

}

function mapDispatchToProps(dispatch: any) {
  return {
    onThrowError: (err: Error) => dispatch(throwError(err)),
    onLogoutUser: () => dispatch(logoutUser())
  };
}

export default connect(
  null,
  mapDispatchToProps
)(withTranslation('index')(IndexPage))
