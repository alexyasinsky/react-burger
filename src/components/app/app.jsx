import AppHeader from '../app-header/app-header';
import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchIngredients } from '../../services/store/ingredients/actions';


export default function App() {

  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchIngredients());
  }, [dispatch])

  return (
    <>
      <AppHeader />
      <main>
        <BurgerIngredientsList/>
        <BurgerConstructor/>
      </main>
    </>
  );
}
