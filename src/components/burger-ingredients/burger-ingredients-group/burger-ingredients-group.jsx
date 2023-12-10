import styles from './burger-ingredients-group.module.scss';
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import {useSelector} from "react-redux";
import {forwardRef} from "react";
import {selectBun, selectFilling} from "../../../services/store/burger-constructor/reducers";
import PropTypes from "prop-types";
import {ingredientPropType} from "../../../services/prop-types";


const BurgerIngredientsGroup = forwardRef(({ title, ingredients }, ref) => {

  const filling = useSelector(selectFilling);
  const bun = useSelector(selectBun);

  const countingData = {};
  ingredients.forEach(item => {
    countingData[item._id] = filling.reduce((acc, ingredient) => ingredient._id === item._id ? ++acc : acc, null);
  });
  bun !== null && (countingData[bun._id] = 2);

  return (
    <article ref={ref}>
      <h2 className="text text_type_main-medium pt-2 pb-6">{title}</h2>
      <div className={styles.group}>
        {ingredients.map((item) => {
          return <BurgerIngredient key={item._id} ingredient={item} count={countingData[item._id]}/>;
        })}
      </div>
    </article>
  )
})

BurgerIngredientsGroup.propTypes = {
  title: PropTypes.string,
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired
}
export default BurgerIngredientsGroup;