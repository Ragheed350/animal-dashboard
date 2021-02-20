import dynamic from 'next/dynamic';
import React from 'react';

const JoditEditor = dynamic(import('jodit-react'), {
    ssr: false,
});



export const HtmlEditor: React.FC<{
    value?: string,
    onChange?: (value: string) => void,
    disable?: boolean;
}> = ({ onChange, value = '', disable = false }) => {
    const config = {
        readonly: disable,
        disablePlugins: [
            'autofocus',
            'print',
            'table',
            'file',
            'video',
            'image',
        ],
    } as any
    return <JoditEditor
        value={value}
        config={config}
        onBlur={(nw: any) => {
            const { innerHTML } = ((nw as FocusEvent).target as HTMLDivElement);
            onChange && onChange(innerHTML)
        }}
    />
}
