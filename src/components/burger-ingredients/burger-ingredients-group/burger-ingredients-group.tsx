import styles from './burger-ingredients-group.module.scss';
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import {useSelector} from "react-redux";
import {forwardRef, JSX} from "react";
import {selectBun, selectFillings} from "../../../services/store/burger-constructor/reducers";
import {TIngredient, TMonoTypeObject} from "../../../utils/types";

type TBurgerIngredientGroupProps = {
  title: string,
  ingredients: Array<TIngredient>
}

const BurgerIngredientsGroup = forwardRef<HTMLElement, TBurgerIngredientGroupProps>(({ title, ingredients }: TBurgerIngredientGroupProps, ref) : JSX.Element => {

  const filling: Array<TIngredient> = useSelector(selectFillings);
  const bun: TIngredient | null = useSelector(selectBun);

  const countingData: TMonoTypeObject<number>= {};

  filling.forEach(item => {
    countingData[item._id] = filling.reduce((acc, ingredient: TIngredient) => ingredient._id === item._id ? ++acc : acc, 0);
  });
  bun !== null && (countingData[bun['_id']] = 2);

  return (
    <article ref={ref}>
      <h2 className="text text_type_main-medium pt-2 pb-6">{title}</h2>
      <div className={styles.group}>
        {ingredients.map((item) => {
          return (<BurgerIngredient key={item._id} ingredient={item} count={countingData[item._id]}/>);
        })}
      </div>
    </article>
  )
})
export default BurgerIngredientsGroup;