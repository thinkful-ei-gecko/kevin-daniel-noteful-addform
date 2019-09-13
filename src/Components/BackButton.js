import React, { Component } from 'react'
import {withRouter} from 'react-router'

class BackButton extends Component {
  render() {
    const { history } = this.props;
    return (
      <div className='sidebar__back'>
      <button type='button' onClick={() => history.goBack()}>
        Go back
      </button>
    </div>
    )
  }
}


export default withRouter (BackButton)
