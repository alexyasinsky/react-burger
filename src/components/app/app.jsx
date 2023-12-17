import AppHeader from '../app-header/app-header';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchIngredients } from '../../services/store/burger-ingredients/actions';
import Home from "../../pages/home/home";
import SignIn from "../../pages/sign-in/sign-in";


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
        <SignIn/>
      </main>
    </>
  );
}
