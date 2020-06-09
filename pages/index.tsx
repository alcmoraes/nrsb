import * as React from 'react'

import { connect } from 'react-redux'

import Cookie from 'js-cookie'

import { AppStore } from '../interfaces';
import { fetchGHUser } from '../reducers';
import { Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';

import GitHubIcon from '@material-ui/icons/GitHub';

import { injectIntl, FormattedMessage, WrappedComponentProps } from 'react-intl';
import { GHUser } from '../models';
import Layout from './layout';
import { ButtonStyling } from '../components/Button/main.style';

interface Props extends AppStore, WrappedComponentProps {
  ghub: {
    user: GHUser
  },
  onGHFetchUser: (user: String) => void
}

interface State {
  input: string
}

class IndexPage extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      input: ""
    }
  }

  lookupUser() {
    const { onGHFetchUser } = this.props;
    console.log(this.state.input);
    onGHFetchUser(this.state.input);
  }

  xurispa(evt: any) {
    console.log(evt.target);
  }

  setLanguage(lang: String) {
    Cookie.set('locale', lang)
    window.location.reload(true)
  }

  render() {

    return (
      <Layout>
        <div className="container">
          <div className="jumbotron">
            <h1 className="text-center"><FormattedMessage id="title" /></h1>
            <hr />
            <div className="row">
              <div className="col-lg-12 text-right">
                <ButtonGroup color="secondary">
                  <Button variant="contained" onClick={this.setLanguage.bind(this, 'br')}>br</Button>
                  <Button variant="contained" onClick={this.setLanguage.bind(this, 'en')}>en</Button>
                </ButtonGroup>
              </div>
              <div className="col-lg-12 text-right mt-3">
                <a target="_blank" href="https://github.com/alcmoraes/nrsb">
                  <FormattedMessage id="more_on_github" />
                </a>
              </div>
            </div>
          </div>
          <div className="text-center row">
            <div className="col-lg-12">
              <TextField value={this.state.input} onChange={(e) => this.setState({ input: e.target.value })} id="outlined-basic" label="@username" variant="outlined" />
            </div>
            <div className="col-lg-12 mt-2">
              <Button variant="contained" color="primary" onClick={this.lookupUser.bind(this)}><FormattedMessage id="lookup_github_user" /></Button>
            </div>
          </div>
          <hr />
          <pre>Github User: {JSON.stringify(this.props.ghub, null, ' ')}</pre>
        </div>
      </Layout>
    )

  }

}

function mapStateToProps(state: any) {
  return {
    ghub: state.get('ghub')
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    onGHFetchUser: (user: String) => dispatch(fetchGHUser(user))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(IndexPage))
