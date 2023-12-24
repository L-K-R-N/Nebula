
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import './styles/main.scss';
import { ProjectsPage } from './pages/ProjectsPage/ProjectsPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { TodoPage } from './pages/TodoPage/TodoPage';
import { Header } from 'components/layout/Header/Header';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Header/>,
    errorElement: <Header/>,
    children: [
      {
        path: '/',
        element: <ProjectsPage/>,
      },
      {
        path: '/projects/:id',
        element: <TodoPage/>,
      }
    ]
  },
  
])
function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
