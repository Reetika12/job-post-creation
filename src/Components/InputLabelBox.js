// @flow weak

import React from 'react';
import classNames from 'classnames';
import SelectMenu from '../Containers/SelectMenu';
import './Styles/InputLabelBoxStyles.css';

function InputLabelBox(props) {
    const {
        classes,
        value,
        label,
        text,
        onChange = null,
        labelStyle = '',
        placeholder = '',
        options = null,
        textarea = false,
        ...orther
    } = props;

    return (
        <div className="input-box-card">
            <label className={classNames('label-box', labelStyle)}>{label}</label>
            <div className="input-view-box">
                {options && (
                    <SelectMenu
                        placeholder={placeholder}
                        {...orther}
                        value={value}
                        handleChange={onChange}
                        options={options}
                    />
                )}
                {text && (
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={value}
                        className="input-box"
                        onChange={onChange}
                        {...orther}
                    />
                )}
                {textarea && (
                    <textarea
                        rows="3"
                        placeholder={placeholder}
                        value={value}
                        className="input-box"
                        onChange={onChange}
                        {...orther}
                    />
                )}
            </div>
        </div>
    );
}

export default InputLabelBox;
