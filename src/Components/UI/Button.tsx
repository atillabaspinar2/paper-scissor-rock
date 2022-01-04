import React from 'react';
import classes from './Button.module.scss';

type Props = {
  onClick?: (event: unknown) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  style: object;
};

export default function Button(props: Props) {
  return (
    <button
      style={props.style}
      disabled={props.disabled || false}
      className={classes.button + ` ` + props.className}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
