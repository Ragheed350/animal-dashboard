import React from 'react';
import './style.less'

export const LoadingPage: React.FC = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, height: '100vh', width: '100vw', backgroundColor: 'whitesmoke', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
            <div className='loading-page-anime' />
        </div>
    )
}