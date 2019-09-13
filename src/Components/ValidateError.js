import React from 'react';
import PropTypes from 'prop-types';

export default function ValidateError(props) {
  if (props.message) {
    return <div className="error">{props.message}</div>;
  }
  return <> </>;
}

ValidateError.propTypes = {
  message: PropTypes.string.isRequired
}
