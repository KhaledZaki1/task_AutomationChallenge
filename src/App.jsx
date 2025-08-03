
import './App.css'
import Login from './components/Login/Login'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home';


function App() {


  const router = createBrowserRouter([
    {path:'/', element: <Login/>},

    {path:'/home', element:<Home/>},
  ])
  

  return <>
  
  
  <RouterProvider router={router}/>
  
  </>
    
    
  
}

export default App
