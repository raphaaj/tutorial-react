import React from 'react';
import './square.css';

function Square(props) {
  return (
    <button className={`square ${props.value ? '' : 'selectable'}`} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function areEqual(prevProps, nextProps) {
  return prevProps.value === nextProps.value && prevProps.onClick === nextProps.onClick;
}

export default React.memo(Square, areEqual);
