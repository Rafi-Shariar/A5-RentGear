
import Navbar from '@/components/shared/navbar';
import React from 'react';

const PublicLayout = async ({children} : {children : React.ReactNode}) => {
    return (
        <div className=''>
            <header>
                <Navbar/>
            </header>
           <main>
             {children}
           </main>
        </div>
    );
};

export default PublicLayout;