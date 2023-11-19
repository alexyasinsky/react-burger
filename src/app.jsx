import AppHeader from './components/app-header/app-header';
import BurgerIngredientList from "./components/burger-ingredient-list/burger-ingredient-list";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import {list} from "./utils/list";
import {cart} from "./utils/cart";


export default function App() {

  return (
    <>
      <AppHeader />
      <main>
        <BurgerIngredientList list={list} cart={cart}/>
        <BurgerConstructor cart={cart}/>
      </main>
    </>
  );
}
