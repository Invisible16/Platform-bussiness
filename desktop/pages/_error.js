import React from 'react';
import PropTypes from 'prop-types';

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    let statusCode = null;
    if (res) {
      ({ statusCode } = res);
    } else if (err) {
      ({ statusCode } = err);
    }
    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;
    return <p>{statusCode ? statusCode : ''}</p>;
  }
}

Error.defaultProps = {
  statusCode: null
};

Error.propTypes = {
  statusCode: PropTypes.number
};

export default Error;
