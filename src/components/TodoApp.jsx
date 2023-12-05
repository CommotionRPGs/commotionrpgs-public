import Navbar from '@/components/Navbar'
import Modal from '@/components/Modal';
import Form from '@/components/Form'
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react'
import { useAuthStore, useDBAuthStore } from '@/context/authStore';

import Home from '@/routes/Home'
import About from '@/routes/About'
import Login from '@/routes/Login';
import Register from '@/routes/Register';
import Profile from '@/routes/Profile';
import NotMatch from '@/routes/NotMatch';
import Layout from '@/components/Layout';
import SinglePage from '@/routes/SinglePage';
import ProtectedRoute from '@/components/ProtectedRoute';
import Spells from '@/routes/Spells';
import Admin from '@/routes/Admin';
import SpellAdminPanel from '@/components/SpellAdminPanel';
import Bestiary from '@/routes/Bestiary';

function TodoApp() {
    const user = useAuthStore((state) => state.user)
    const dbLogin = useDBAuthStore((state) => state.login)

    useEffect(() => {
        if (user) {
            console.log(user)
            dbLogin(user.access_token)
        }
    }, [user])

    return (
        <Routes>
            <Route path="/" element={
                <ProtectedRoute>
                    <Layout />    
                </ProtectedRoute>
            }>
                <Route index element={<Home />} />
                <Route path="spells">
                    <Route index element={<Spells />} />
                    <Route path=":spell" element={<SinglePage />}/>
                </Route>
                <Route path="bestiary">
                    <Route index element={<Bestiary />} />
                </Route>
                <Route path="about" element={<About />}>
                    <Route path=":slug" element={<SinglePage />} />
                </Route>
                {/*<Route path="login" element={<Login />} />*/}
                <Route
                    path="profile" 
                    element={<Profile />} 
                />
                <Route path="admin" element={
                    <ProtectedRoute allowedTypes={['admin']}>
                        <Admin />    
                    </ProtectedRoute>
                }>
                    <Route path="spells" element={ <SpellAdminPanel /> }/>
                </Route>
                <Route path="*" element={<NotMatch />} />    
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
  };
export default TodoApp;