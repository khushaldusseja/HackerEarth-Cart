import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Ribbon = styled.div`
  position: fixed;
  top: 0;
  width: 98%;
  text-align: center;
  color: #3c763d;
  background-color: #dff0d8;
  border-color: #d6e9c6;
  padding: 15px;
  border-radius: 4px;
`;

const Message = styled.div`
  position: relative;
  float: left;
`;
const Close = styled.a`
  float: right;
  padding: 0 10px;
`;

class Notification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onHandleCloseNotification = this.onHandleCloseNotification.bind(this);
  }

  onHandleCloseNotification(e) {
    const { onCloseNotification } = this.props;
    onCloseNotification(e);
  }

  render() {
    const { message = '' } = this.props;

    return (
      <Ribbon>
        <Message>{message}</Message>
        <Close href="#" onClick={this.onHandleCloseNotification}>
          X
        </Close>
      </Ribbon>
    );
  }
}

Notification.propTypes = {
  dispatch: PropTypes.func,
  onCloseNotification: PropTypes.func,
  message: PropTypes.string
};

export default Notification;
