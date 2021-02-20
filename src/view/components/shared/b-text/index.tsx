import { Typography } from 'antd';
import { TextProps } from 'antd/lib/typography/Text';
import React, { FC } from 'react';

import { primaryColor, secondaryColor, darkColor, successColor, warningColor, dangerColor, } from '@core';


const { Text, Title } = Typography;

export interface BTextProps extends TextProps {
    lvl?: 1 | 2 | 3 | 4;
    color?: 'primary' | 'secondary' | 'white' | 'dark' | 'gray' | 'success' | 'danger' | 'warning';
    fw?: 'lighter' | 'light' | 'normal' | 'bold' | 'bolder' | 'boldest';
    t?: 1 | 2 | 3 | 4 | 5
    fs?: 'normal' | 'italic'
}

export const BText: FC<BTextProps> = ({ lvl, color, fs = 'normal', fw = 'normal', t, children, ...rest }) => {
    let _color;
    switch (color) {

        case 'dark':
            _color = darkColor;
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

        case 'gray':
            _color = 'gray';
            break;

        case 'white':
            _color = 'white';
            break;
    }
    let _lvl;
    switch (lvl) {
        case 1:
            _lvl = '2.2rem'
            break;

        case 2:
            _lvl = '1.8rem'
            break;

        case 3:
            _lvl = '1.4rem'
            break;

        case 4:
            _lvl = '1rem'
            break;
    }

    let _fw;
    switch (fw) {
        case 'light':
            _fw = 300
            break;
        case 'lighter':
            _fw = 400
            break;
        case 'normal':
            _fw = 500
            break;
        case 'bold':
            _fw = 600
            break;
        case 'bolder':
            _fw = 700
            break;
        case 'boldest':
            _fw = 800
            break;
    }

    const _style: React.CSSProperties = {
        fontWeight: _fw,
        fontStyle: fs,
        fontSize: _lvl,
        color: _color,
        ...rest.style
    }

    if (t)
        return <Title {...rest} level={t} style={_style}>{children}</Title>

    return <Text {...rest} style={_style}>{children}</Text>
}