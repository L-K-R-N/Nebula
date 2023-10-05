
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import './styles/main.scss';
import { ProjectsPage } from './pages/ProjectsPage/ProjectsPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { TodoPage } from './pages/TodoPage/TodoPage';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProjectsPage/>,
    errorElement: <ProjectsPage/>
  },
  {
    path: '/projects/:id',
    element: <TodoPage/>,
  }
])
function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
