import Icon from '@ant-design/icons';
import React from 'react';

const svg = () => <svg fill='currentColor' width='1em' height='1em' viewBox="0 0 22 20">
    <g transform="translate(1 1)">
        <rect width="20" height="14" rx="2" transform="translate(0 4)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
        <path id="Shape" d="M8,18V2A2,2,0,0,0,6,0H2A2,2,0,0,0,0,2V18" transform="translate(6)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
    </g>
</svg>

export const BusinessBagOutlined: React.FC<{ style?: React.CSSProperties }> = ({ style }) => <Icon style={style} component={svg} />