import Header from './components/header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import PrivateRoute from './pages/private';
import { AuthProvider } from './context/authenticateProvider';
import Profile from './pages/profile/profile';
import PostUser from './pages/profile/postUser/postUser';

const App = () => {
  return (
    <>
      <AuthProvider>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/private" element={<PrivateRoute/>}/>
          <Route path="/:username" element={<Profile/>}/>
          <Route path="/:username/post/:postID" element={<PostUser/>}/>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
