import AppHeader from './components/app-header/app-header';
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
// import {data} from './utils/data.js';


export default function App() {
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
