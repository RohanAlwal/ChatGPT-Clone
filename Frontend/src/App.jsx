import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat';

function App() {
  // const [page, setPage] = useState('login');
  const [token, setToken] = useState(null);

  useEffect(() => {
    const save = localStorage.getItem('chatGPT_clone_token', token);
    setToken(save);
  });

  const handleLogin = (token) => {
    localStorage.setItem('chatGPT_clone_token',token);
    setToken(token);
  }

  const handleLogout = () => {
    localStorage.removeItem('chatGPT_clone_token');
    setToken(null);
  }

  return (
    // <div>
    //   <div className='bg-gray-100 flex justify-end gap-4'>
    //     <button className="bg-blue-300 px-4 py-1 rounded hover:" onClick={()=>{setPage('login')}}>
    //       Login
    //       </button>
    //       <button className="bg-gray-300 px-4 py-1 rounded" onClick={()=>{setPage('register')}}>
    //         Register
    //       </button>
    //   </div>
    //   {page === 'login' ? <Login />: <Register />}
    //   <button onClick={handleLogout} className='bg-red-400 px-4 py-1 rounded'>Logout</button>
    // </div>
    <Routes>
        <Route path="/" element = {token ? <Navigate to = "/chat" /> : <Navigate to = "/login" />} />
        <Route path="/login" element = {!token ? <Login onLogin={handleLogin}/> : <Navigate to = "/chat" />} />
        <Route path="/register" element = {!token ? <Register /> : <Navigate to = "/login" />} />
        <Route path="/chat" element={token ? <Chat onLogout={handleLogout}/> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App
