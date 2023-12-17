import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

import styles from './home.module.scss';


export default function Home () {
  return (
    <div className={styles.wrapper}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </DndProvider>
    </div>

  )
}