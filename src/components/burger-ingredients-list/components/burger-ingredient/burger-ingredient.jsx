import styles from './burger-ingredient.module.scss';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientPropType} from '../../../../services/prop-types';
import Modal from '../../../modal/modal';
import IngredientDetails from '../../../ingredient-details/ingredient-details';
import {useDispatch, useSelector} from "react-redux";
import {setCurrentIngredient} from "../../../../services/store/ingredients/reducers";
import {useCallback} from "react";
import {selectCurrentIngredient} from "../../../../services/store/ingredients/selectors";

export default function BurgerIngredient({ingredient}) {

  const currentIngredient = useSelector(selectCurrentIngredient);

  const dispatch = useDispatch();

  const openIngredientDetailsModal = useCallback(() => {
    dispatch(setCurrentIngredient(ingredient));
  }, [dispatch, ingredient])

  const closeIngredientDetailsModal = useCallback(() => {
    dispatch(setCurrentIngredient(null));
  }, [dispatch, ingredient])

  return (
    <>
      <figure className={`${styles.card} mb-8`} onClick={openIngredientDetailsModal}>
        {ingredient.quantity && (
          <Counter count={ingredient.quantity} size="default"/>
        )}
        <img
          className="ml-4 mr-4 mb-4"
          src={ingredient.image}
          alt={ingredient.name}
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
      {currentIngredient && currentIngredient._id === ingredient._id && (
        <Modal onClose={closeIngredientDetailsModal} title="Детали ингредиента">
          <IngredientDetails/>
        </Modal>
      )}
    </>
  );
}

BurgerIngredient.propTypes = {
  ingredient: ingredientPropType.isRequired,
};
