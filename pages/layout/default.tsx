import React, { PureComponent, ReactNode } from 'react'
import Snackbar from '@material-ui/core/Snackbar'

import { injectIntl, WrappedComponentProps } from 'react-intl';

import { connect } from 'react-redux'
import { clearError } from '../../reducers';
import { AppStore } from '../../interfaces';

interface Props extends AppStore, WrappedComponentProps {
    error?: Error
    onClearErrors: () => void
}
interface State {}

class Index extends PureComponent<Props, State> {

    clearError() {
        const { onClearErrors } = this.props;
        onClearErrors();
    }

    render(): ReactNode {

        const { children } = this.props

        return (
            <div className="wrapper">
                <Snackbar
                    open={Boolean(this.props.error?.message)}
                    message={this.props.error ? this.props.error.message : ''}
                    autoHideDuration={4000}
                    onClose={this.clearError.bind(this)}
                />
                {children}
            </div>
        )
    }
}


function mapStateToProps(state: any) {
    return {
      error: state.get('error')
    };
  }
  
  function mapDispatchToProps(dispatch: any) {
      return {
        onClearErrors: () => dispatch(clearError())
      };
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(injectIntl(Index))
