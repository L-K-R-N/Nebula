
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import './styles/main.scss';
import { ProjectsPage } from './pages/ProjectsPage/ProjectsPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { TodoPage } from './pages/TodoPage/TodoPage';
import { Header } from 'components/layout/Header/Header';
import { ImportantsPage } from 'pages/ImportantsPage/ImportantsPage';
import { ProfilePage } from 'pages/ProfilePage/ProfilePage';
import { FriendsPage } from 'pages/FriendsPage/FriendsPage';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Header/>,
    errorElement: <Header/>,
    children: [
      {
        path: '/Project-Hub',
        element: <ProjectsPage/>,
      },
      {
        path: 'projects/:id',
        element: <TodoPage/>,
      },
      {
        path: 'profile',
        element: <ProfilePage/>,
      },
      {
        path: 'friends',
        element: <FriendsPage/>,
      },
      {
        path: 'importants',
        element: <ImportantsPage/>,
      },
    ]
  },
  
])
function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
