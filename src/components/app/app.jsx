import AppHeader from '../app-header/app-header';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchIngredients } from '../../services/store/burger-ingredients/actions';
import Home from "../../pages/home/home";
import SignIn from "../../pages/sign-in/sign-in";

import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";


export default function App() {

  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchIngredients());
  }, [dispatch])

  return (
    <>
      <AppHeader />
      <main>
        {/*<Home/>*/}
        {/*<SignIn/>*/}
        {/*<Register/>*/}
        {/*<ForgotPassword/>*/}
        {/*<ResetPassword/>*/}
        <Profile/>
      </main>
    </>
  );
}
