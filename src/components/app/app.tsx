import AppHeader from '../app-header/app-header';
import {useEffect, JSX} from 'react';
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
import ProfileUser from "../profile-user/profile-user";
import ProfileOrderHistory from "../profile-order-history/profile-order-history";
import Feed from "../../pages/feed/feed";
import {useAppDispatch} from "../../services/store/hooks";
import OrderDetails from "../order-details/order-details";


export default function App(): JSX.Element {

  const location = useLocation();
  const navigate = useNavigate();
  const background: string = location.state && location.state.background;

  const handleModalClose = () : void => {
    return navigate(-1);
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(fetchIngredients());
  }, [dispatch])


  return (
    <>
      <AppHeader/>
      <main className='pt-10 pl-5 pr-5'>
        <Routes location={background || location}>
          <Route path="/" element={<Home/>}/>
          <Route path="/feed" element={<Feed/>}/>
          <Route path="/login" element={<OnlyUnAuth component={<Login/>}/>}/>
          <Route path="/register" element={<OnlyUnAuth component={<Register/>}/>}/>
          <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword/>}/>}/>
          <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword/>}/>}/>
          <Route path="/profile" element={<OnlyAuth component={<Profile/>}/>}>
            <Route index element={<ProfileUser/>}/>
            <Route path='orders' element={<ProfileOrderHistory/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Route>
          <Route path='/feed/:id' element={<OrderDetails/>}/>
          <Route path='/profile/orders/:id' element={<OrderDetails/>}/>
          <Route path='/ingredients/:id' element={<IngredientDetails/>}/>
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
            <Route
              path='/feed/:id'
              element={
                <Modal
                  onClose={handleModalClose}
                >
                  <OrderDetails/>
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:id'
              element={
                <Modal
                  onClose={handleModalClose}
                >
                  <OrderDetails/>
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
