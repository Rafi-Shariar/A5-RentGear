import LoadingAnimation from '@/components/shared/LoadingAnimation';
import React from 'react';
const loading = () => {
    return (
        <div className='min-h-[calc(100vh-80px)] flex justify-center items-center '>
            <LoadingAnimation/>
        </div>
    );
};

export default loading;