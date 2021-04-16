import React from 'react';
import ClassNames from 'classnames';

import './styles.css';

function Button(props) {
    let {
        type = 'primary',
        size = 'md',
        className = '',
        outline = false,
        ...extra
    } = props;

    return (
        <button
            type="button"
            className={ClassNames(
                'btn',
                `btn--${size}`,
                { [`btn--outline--${type}`]: outline },
                { [`btn--${type}`]: !outline },
                className
            )}
            onClick={props.onClick}
            {...extra}
        >
            {props.label}
        </button>
    );
}

export default Button;
