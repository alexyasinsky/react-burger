import AppHeader from '../app-header/app-header';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {fetchIngredients} from '../../services/store/burger-ingredients/actions';
import {Routes, Route} from 'react-router-dom';
import Home from "../../pages/home/home";
import Login from "../../pages/login/login";

import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import NotFound from "../../pages/not-found/not-found";


export default function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch])

  return (
<>
  <AppHeader/>
  <main>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/reset-password" element={<ResetPassword/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  </main>
</>

  );
}
