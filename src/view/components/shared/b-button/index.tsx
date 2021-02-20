import Button, { ButtonProps } from 'antd/lib/button';
import React from 'react';

import { primaryColor, secondaryColor, darkColor, successColor, warningColor, dangerColor, } from '@core';


const bStyle: React.CSSProperties = {
    height: 'fit-content'
}

export interface BButtonProps extends ButtonProps {
    color?: 'primary' | 'secondary' | 'white' | 'dark' | 'gray' | 'success' | 'danger' | 'warning'
    background?: 'primary' | 'secondary' | 'transpart';
}

export const BButton: React.FC<BButtonProps> = ({ children, color, background, style, ...rest }) => {
    let _color;
    switch (color) {
        case 'dark':
            _color = darkColor;
            break;

        case 'gray':
            _color = 'gray';
            break;

        case 'white':
            _color = 'white';
            break;

        case 'primary':
            _color = primaryColor;
            break;

        case 'secondary':
            _color = secondaryColor;
            break;

        case 'success':
            _color = successColor;
            break;

        case 'warning':
            _color = warningColor;
            break;

        case 'danger':
            _color = dangerColor;
            break;
    }
    const _style: React.CSSProperties = { color: _color, ...bStyle, ...style }
    switch (background) {
        case 'primary':
            return <Button type='primary' {...rest} style={_style}>{children}</Button>
        case 'secondary':
            return <Button type='primary' {...rest} style={{ backgroundColor: secondaryColor, border: `1px solid ${secondaryColor}`, ..._style }}>{children}</Button>
        case 'transpart':
            return <Button type='text' {...rest} style={{ backgroundColor: 'rgba(200, 200, 200, 0.25)', backdropFilter: 'blur(5px)', ..._style }}>{children}</Button>;
        default:
            return <Button {...rest} style={_style}>{children}</Button>;
    }
}
