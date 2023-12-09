import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchIngredients } from '../../services/store/burger-ingredients/actions';


export default function App() {

  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchIngredients());
  }, [dispatch])

  return (
    <>
      <AppHeader />
      <main>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </main>
    </>
  );
}
