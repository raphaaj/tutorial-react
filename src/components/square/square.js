import React from 'react';
import './square.css';

function Square(props) {
  let classNames = ['square'];
  if (props.isSelectable) classNames.push('selectable');
  if (props.isWinningSquare) classNames.push('winning-square');

  return (
    <button className={classNames.join(' ')} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function areEqual(prevProps, nextProps) {
  return prevProps.value === nextProps.value && prevProps.onClick === nextProps.onClick;
}

export default React.memo(Square, areEqual);
