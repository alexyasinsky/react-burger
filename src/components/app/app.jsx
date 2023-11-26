import AppHeader from '../app-header/app-header';
import BurgerIngredientList from "../burger-ingredient-list/burger-ingredient-list";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {cart} from "../../utils/cart";
import { useEffect, useState } from 'react';


export default function App() {

  const url = 'https://norma.nomoreparties.space/api/ingredients';

  const [list, setList] = useState([]);

  useEffect(()=>{
    fetch(url)
    .then(res => res.json())
    .then(data => setList(data.data))
    .catch(err => alert(err))
  }, [])

  return (
    <>
      <AppHeader/>
      <main>
        <BurgerIngredientList list={list} cart={cart}/>
        <BurgerConstructor cart={cart}/>
      </main>
    </>
  );
}
