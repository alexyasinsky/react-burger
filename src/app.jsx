import AppHeader from './components/app-header/app-header';
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import {bun, ingredients} from "./utils/data";



export default function App() {

  return (
    <>
      <AppHeader />
      <main>
        <BurgerIngredients/>
        <BurgerConstructor bun={bun} ingredients={ingredients}/>
      </main>
    </>
  );
}
