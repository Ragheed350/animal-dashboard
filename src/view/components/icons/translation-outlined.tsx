import Icon from '@ant-design/icons';
import React from 'react';

const svg = () => <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 469.333 469.333" >
    <path d="M253.227,300.267L253.227,300.267L199.04,246.72l0.64-0.64c37.12-41.387,63.573-88.96,79.147-139.307h62.507V64H192     V21.333h-42.667V64H0v42.453h238.293c-14.4,41.173-36.907,80.213-67.627,114.347c-19.84-22.08-36.267-46.08-49.28-71.467H78.72     c15.573,34.773,36.907,67.627,63.573,97.28l-108.48,107.2L64,384l106.667-106.667l66.347,66.347L253.227,300.267z" />
    <path d="M373.333,192h-42.667l-96,256h42.667l24-64h101.333l24,64h42.667L373.333,192z M317.333,341.333L352,248.853     l34.667,92.48H317.333z" />
</svg>

export const TranslationOutlined: React.FC<{ style?: React.CSSProperties }> = ({ style }) => <Icon style={style} component={svg} />
