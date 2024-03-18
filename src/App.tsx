import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/main.scss';

import { TodoPage } from './pages/TodoPage/TodoPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProfilePage } from './pages/ProfilePage';
import { FriendsPage } from './pages/FriendsPage/FriendsPage';
import { ImportantsPage } from './pages/ImportantsPage';
import { Layout } from './components/layout/Layout/Layout';

export const router = createBrowserRouter([
   {
      path: '/',
      element: <Layout />,
      errorElement: <Layout />,
      children: [
         {
            path: 'nebula',
            element: <ProjectsPage />,
         },
         {
            path: 'projects/:id',
            element: <TodoPage />,
         },
         {
            path: 'profile',
            element: <ProfilePage />,
         },
         {
            path: 'friends',
            element: <FriendsPage />,
         },
         {
            path: 'importants',
            element: <ImportantsPage />,
         },
      ],
   },
]);
const App = () => {
   return <RouterProvider router={router} />;
};

export default App;
