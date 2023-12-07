import styles from './burger-ingredients-group.module.scss';
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import {useSelector} from "react-redux";
import {selectCart} from "../../../../services/store/ingredients/selectors";


export default function BurgerIngredientsGroup({ title, ingredients }) {

  const cart = useSelector(selectCart);

  const countingData = {};
  ingredients.forEach(item => {
    countingData[item._id] = cart.reduce((acc, ingredient) => ingredient._id === item._id ? ++acc : acc, null);
  })

  return (
    <article>
      <h2 className="text text_type_main-medium pt-2 pb-6">{title}</h2>
      <div className={styles.group}>
        {ingredients.map((item) => {
          return <BurgerIngredient key={item._id} ingredient={item} count={countingData[item._id]}/>;
        })}
      </div>
    </article>
  )
}