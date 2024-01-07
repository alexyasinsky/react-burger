import styles from './burger-ingredient.module.scss';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientPropType} from '../../../utils/prop-types';
import {useDrag} from "react-dnd";
import PropTypes from "prop-types";
import {Link, useLocation} from "react-router-dom";

export default function BurgerIngredient({ingredient, count}) {

  const [, dragRef] = useDrag({
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

BurgerIngredient.propTypes = {
  ingredient: ingredientPropType.isRequired,
  count: PropTypes.number
};
