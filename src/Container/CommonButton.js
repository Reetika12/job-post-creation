import React from 'react';
import './styles.css';

function Button(props) {

  let {

    label = '',

    type = 'primary',

    size = 'md',

    className = '',

    outline = false,

    onClick

  } = props;


  let btnClasses = ['btn'];


  if (outline) {

    btnClasses.push(`btn--outline--${type}`);

  } else {

    btnClasses.push(`btn--${type}`);

  }


  btnClasses.push(`btn--${size}`);

  btnClasses.push(className);


  btnClasses = btnClasses.join(' ');


  return (

    <button type="button" className={btnClasses} onClick={onClick}>

      {label}

    </button>

  );

}


export default Button;