import React from 'react';
import { strengthIndicator, strengthColor } from './strength-password';

//https://medium.com/@leonardobrunolima/react-tips-password-strength-indicator-fbc08320733e
export default function PasswordInput(props) {

    const strength = strengthIndicator(props.value);
    const color = strengthColor(strength);

    return (
        <input
            type='password'
            value={props.value}
            className={props.className}
            placeholder={props.placeholder}
            onChange={props.handleChanges}
            style={{
                borderColor: color
            }}
        />
    )
}