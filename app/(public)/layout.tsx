
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/navbar';
import { getMe } from '@/services/getMe';
import React from 'react';

const PublicLayout = async ({children} : {children : React.ReactNode}) => {

    const user = await getMe();

    return (
        <div className='min-h-screen flex flex-col'>
            <header>
                <Navbar user={user}/>
            </header>
           <main className='w-full max-w-7xl mx-auto px-2 pt-28 flex-1'>
             {children}
           </main>

           <footer>
            <Footer/>
           </footer>
        </div>
    );
};

export default PublicLayout;