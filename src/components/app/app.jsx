import AppHeader from '../app-header/app-header';
import BurgerIngredientList from '../burger-ingredient-list/burger-ingredient-list';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { cart } from '../../utils/cart';
import { useEffect, useState } from 'react';
import { useAPI } from '../../hooks/useAPI';

export default function App() {

  const [list, setList] = useState([]);

  const url = 'https://norma.nomoreparties.space/api/ingredients';
  const { getData } = useAPI();

  useEffect(() => {
    getData(url).then((data) => setList(data.data));
  }, [getData]);

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
