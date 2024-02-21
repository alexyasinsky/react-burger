import styles from './burger-ingredient.module.scss';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";
import {TIngredient} from "../../../utils/types";
import {JSX} from "react";

type TProps = {
  ingredient: TIngredient;
  count: number
}

export default function BurgerIngredient({ingredient, count}: TProps) : JSX.Element {

  const [, dragRef] = useDrag<TIngredient, unknown, unknown>({
    type: ingredient.constructorExtraType,
    item: ingredient,
  });

  const location = useLocation();

  return (
    <Link
      key={ingredient._id}
      to={`/ingredients/${ingredient._id}`}
      state={{ background: location }}
      className={styles.link}
    >
      <figure className={`${styles.card} mb-8`}>
        {count && (
          <Counter count={count} size="default"/>
        )}
        <img
          className={` ml-4 mr-4 mb-4`}
          src={ingredient.image}
          alt={ingredient.name}
          ref={dragRef}
          data-test-ingredient={ingredient._id}
        />
        <div className={styles.price}>
          <p className="text text_type_digits-default mb-4">
            {ingredient.price}
          </p>
          <CurrencyIcon type="primary"/>
        </div>
        <figcaption className="text text_type_main-default">
          {ingredient.name}
        </figcaption>
      </figure>
    </Link>
  );
}
