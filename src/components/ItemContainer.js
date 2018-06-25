import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Item = styled.div`
  padding: 10px;
  background: #fff;
  border: 1px solid #ccc;
  color: #333;
  cursor: move;
  display: block;
  font-size: 14px;
  line-height: 1.42857143;
  margin-top: -1px;
  position: relative;
`;
const Title = styled.div`
  display: inline-block;
  line-height: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #3b73af;
`;
const Summary = styled.div`
  display: block;
  line-height: 1.1;
  max-height: 3.3em;
  overflow: hidden;
  word-wrap: break-word;
`;
const Close = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: 0 !important;
`;

const ItemContainer = props => {
  const { index, title, summary, column, handleRemoveItem, ...restProps } = props;

  const onHandleRemoveItem = () => {
    handleRemoveItem({ index, column, title, summary });
  };

  return (
    <Item {...restProps}>
      <Title>{title}</Title>
      <Summary>{summary}</Summary>
      <Close className="btn btn-default btn-xs" data-test="close" onClick={onHandleRemoveItem}>
        &times;
      </Close>
    </Item>
  );
};

ItemContainer.propTypes = {
  index: PropTypes.number,
  title: PropTypes.string,
  summary: PropTypes.string,
  column: PropTypes.string,
  handleRemoveItem: PropTypes.func
};

export default ItemContainer;
