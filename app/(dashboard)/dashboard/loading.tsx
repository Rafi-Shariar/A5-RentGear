import LoadingAnimation from '@/components/shared/LoadingAnimation';
import React from 'react';
const loading = () => {
    return (
        <div className='min-h-screen flex justify-center items-center '>
            <LoadingAnimation/>
        </div>
    );
};

export default loading;