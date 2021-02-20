import { Typography } from 'antd';
import { ParagraphProps } from 'antd/lib/typography/Paragraph';
import React, { FC } from 'react';

import { primaryColor, secondaryColor, darkColor, successColor, warningColor, dangerColor, } from '@core';


const { Paragraph } = Typography;

export interface BParagraphProps extends ParagraphProps {
    lvl?: 1 | 2 | 3;
    color?: 'primary' | 'secondary' | 'white' | 'dark' | 'gray' | 'success' | 'danger' | 'warning';
    bold?: boolean;
}

export const BParagraph: FC<BParagraphProps> = ({ lvl = 3, color = 'dark', bold = false, children, style, ...rest }) => {
    let _ = '';
    const fw = bold ? 900 : undefined;
    switch (color) {

        case 'dark':
            _ = darkColor;
            break;

        case 'primary':
            _ = primaryColor;
            break;

        case 'secondary':
            _ = secondaryColor;
            break;

        case 'success':
            _ = successColor;
            break;

        case 'warning':
            _ = warningColor;
            break;

        case 'danger':
            _ = dangerColor;
            break;

        case 'gray':
            _ = 'gray';
            break;

        case 'white':
            _ = 'white';
            break;

        default:
            _ = darkColor;
            break;
    }
    let _lvl;
    switch (lvl) {
        case 1:
            _lvl = '1.6rem'
            break;

        case 2:
            _lvl = '1.3rem'
            break;

        case 3:
            _lvl = '1rem'
            break;

        default:
            _lvl = '1rem'
            break;
    }
    return <Paragraph style={{ fontWeight: fw, fontSize: _lvl, color: _, ...style }} {...rest}>{children}</Paragraph>

}
