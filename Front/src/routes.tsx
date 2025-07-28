import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ProjectsPage from './Pages/ProjectsPage';
import InternshipsPage from './Pages/InternshipsPage';
import Oodser from './components/compoPages/internships/Oodser';
import Menagalme from './components/compoPages/internships/Menagalme';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/projects",
    element: <ProjectsPage />,
  },
  {
    path: "/internships",
    element: <InternshipsPage />,
  },
  {
    path: "/intern/oodser",
    element: <Oodser />,
  },
  {
    path: "/intern/menagalme",
    element: <Menagalme />,
  },
]);