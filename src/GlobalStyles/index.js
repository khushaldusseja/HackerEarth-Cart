import React from 'react';
import PropTypes from 'prop-types';

import { injectGlobal } from 'styled-components';

import styles from './styles';

const GlobalStyles = ({ children, ...restProps }) => {
  injectGlobal`
    ${styles}
  `;

  return <div {...restProps}>{children}</div>;
};

GlobalStyles.propTypes = {
  children: PropTypes.node
};

export default GlobalStyles;
