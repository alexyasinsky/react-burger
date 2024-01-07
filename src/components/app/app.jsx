import AppHeader from '../app-header/app-header';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {fetchIngredients} from '../../services/store/burger-ingredients/actions';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import Home from "../../pages/home/home";
import Login from "../../pages/login/login";

import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import NotFound from "../../pages/not-found/not-found";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {OnlyAuth, OnlyUnAuth} from "../protected-route/protected-route";
import {checkUserAuth} from "../../services/store/user/actions";
import User from "../user/user";
import Orders from "../orders/orders";


export default function App() {

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    navigate(-1);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(fetchIngredients());
  }, [dispatch])

  return (
    <>
      <AppHeader/>
      <main>
        <Routes location={background || location}>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<OnlyUnAuth component={<Login/>}/>}/>
          <Route path="/register" element={<OnlyUnAuth component={<Register/>}/>}/>
          <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword/>}/>}/>
          <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword/>}/>}/>
          <Route path="/profile" element={<OnlyAuth component={<Profile/>}/>}>
            <Route index element={<User/>}/>
            <Route path='orders' element={<Orders/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Route>
          <Route path='/ingredients/:id'
                 element={<IngredientDetails/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        {background && (
          <Routes>
            <Route
              path='/ingredients/:id'
              element={
                <Modal
                  onClose={handleModalClose}
                >
                  <IngredientDetails/>
                </Modal>
              }
            />
          </Routes>
        )}
      </main>
      <footer></footer>
    </>

  );
}
