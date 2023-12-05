import AppHeader from '../app-header/app-header';
import BurgerIngredientList from '../burger-ingredient-list/burger-ingredient-list';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { cart } from '../../services/db/cart';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIngredients } from '../../services/store/ingredients/actions';

export default function App() {

  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchIngredients());
  }, [dispatch])

  const list = useSelector(state => state.ingredientsSlice.ingredients);

  return (
    <>
      <AppHeader />
      <main>
        <BurgerIngredientList list={list} cart={cart} />
        <BurgerConstructor cart={cart} />
      </main>
    </>
  );
}
