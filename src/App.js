import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login/Login';
import Register from './Pages/Registration/Register';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Profile from './Pages/Profile/Profile';
import EditProfile from './Pages/Profile/EditProfile'
const router = createBrowserRouter([
  {path:"/register",element:<Register/>},
  {path:"/login",element:<Login/>},
  {path:"/",element:<Login/>},
  {path:"/profile",element:<Profile/>},
  {path:"/edit-profile", element:<EditProfile />},

])
function App() {
  return (
    <div className="App">

       <RouterProvider router={router}/>
      {/* <Register/> */}
    </div>
  );
}

export default App;
