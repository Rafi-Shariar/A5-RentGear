
import Navbar from '@/components/shared/navbar';
import React from 'react';

const PublicLayout = async ({children} : {children : React.ReactNode}) => {
    return (
        <div className=''>
            <header>
                <Navbar/>
            </header>
           <main className='max-w-7xl mx-auto px-2'>
             {children}
           </main>
        </div>
    );
};

export default PublicLayout;