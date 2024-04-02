import { Routes, Route, Navigate } from 'react-router-dom';
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
import SpellAdminPanel from '@/components/admin/SpellAdminPanel';
import MonsterAdminPanel from './admin/MonsterAdminPanel';
import Bestiary from '@/routes/Bestiary';
import ProfilePanel from '@/components/profile/ProfilePanel';
import ProfilePlayersPanel from '@/components/profile/ProfilePlayersPanel';
import PageTurn from '@/routes/PageTurn';
import CharClasses from '@/routes/CharClassses';
import Subclass from '@/routes/Subclass';

function TodoApp() {
    const user = useAuthStore((state) => state.user)
    const dbLogin = useDBAuthStore((state) => state.login)

    useEffect(() => {
        if (user) {
            //console.log(user)
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
                <Route path="classes">
                    <Route index element={<CharClasses />} />
                    <Route path=":subclass" element={<Subclass />}/>
                </Route>
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
                <Route path="pageturn" element={<PageTurn />} />
                <Route path="profile" element={<Profile />} >
                    <Route index element={<Navigate to="overview"/>} />
                    <Route path="players" element={<ProfilePlayersPanel />} />
                    <Route path=":tab" element={<ProfilePanel />} />
                </Route>
                <Route path="admin" element={
                    <ProtectedRoute allowedTypes={['admin']}>
                        <Admin />    
                    </ProtectedRoute>
                }>
                    <Route index element={<Navigate to="general"/>}/>
                    <Route path="spells" element={ <SpellAdminPanel /> }/>
                    <Route path="monsters" element={ <MonsterAdminPanel /> }/>
                    <Route path="general" element={<div>General</div>} />
                </Route>
                <Route path="*" element={<NotMatch />} />    
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
  };
export default TodoApp;