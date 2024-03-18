import { Outlet } from 'react-router-dom';

import { Suspense } from 'react';
import { Header } from '../Header/Header';
import { Loader } from '@/components/UI/Loader/Loader';

interface Props {}

export const Layout: React.FC<Props> = () => {
   return (
      <>
         <Header />
         <main className="main">
            <Suspense fallback={<Loader />}>
               <Outlet />
            </Suspense>
         </main>
      </>
   );
};
