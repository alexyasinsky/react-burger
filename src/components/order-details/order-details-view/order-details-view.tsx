import {JSX, useEffect, useState} from "react";
import {TIngredient, TOrder} from "../../../utils/types";
import styles from './order-details-view.module.scss';
import uuid from "../../../utils/uuid";
import {useAppSelector} from "../../../services/store/hooks";
import {selectIngredients} from "../../../services/store/burger-ingredients/reducers";
import {TMonoTypeObject} from "../../../utils/types";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";


type TProps = {
  order: TOrder;
  number: string;
  translatedStatus: string;
  time: string;
}

export default function OrderDetailsView({order, number, translatedStatus, time}: TProps): JSX.Element {

  const ingredientsFromStore: Array<TIngredient> = useAppSelector(selectIngredients);

  const [orderIngredients, setOrderIngredients] = useState<Array<TIngredient>>([]);
  const [orderPrice, setOrderPrice] = useState<number>(0);
  const [uniqueIngredientsCount, setUniqueIngredientsCount] = useState<TMonoTypeObject<number> | null>(null);

  useEffect(() => {
    const ingredients: Array<TIngredient> = [];
    const uniqueIngredientsCount= order.ingredients.reduce((acc: TMonoTypeObject<number>, el) => {
      acc[el] = (acc[el] || 0) + 1;
      return acc;
    }, {});
    let price = 0;
      Object.keys(uniqueIngredientsCount).forEach((ingredientId) => {
      const ingredientForAdd = ingredientsFromStore.find(ingredient => ingredient._id === ingredientId)!;
      price += +ingredientForAdd.price;
      ingredients.push(ingredientForAdd);
    })
    setOrderIngredients([...ingredients]);
    setOrderPrice(price);
    setUniqueIngredientsCount(uniqueIngredientsCount);
  }, [order, ingredientsFromStore]);

  return (
    <article className={styles.wrapper}>
      <p className="text text_type_digits-default mb-8">
        {number}
      </p>
      <h3 className="text text_type_main-medium mb-1">
        {order.name}
      </h3>
      <p className={`${styles[order.status]} text text_type_main-small mb-8`}>
        {translatedStatus}
      </p>
      <h4 className="text text_type_main-medium mb-4">
        Состав:
      </h4>
      <div className={`${styles.ingredient__box} mb-8 custom-scroll`}>
        {
          orderIngredients.map(ingredient => {
            return (
              <div key={uuid()} className={`${styles.ingredient} mb-2`}>
                <div className={`${styles.image} mr-4`}
                     style={{backgroundImage: `url(${ingredient.image_mobile})`}}/>
                <p className='text text_type_main-small'>
                  {ingredient.name}
                </p>
                <div className={`${styles.countAndPrice}`}>
                  <p className="text text_type_digits-default mr-1">
                    {uniqueIngredientsCount && uniqueIngredientsCount[ingredient._id] + ' x ' + ingredient.price}
                  </p>
                  <CurrencyIcon type="primary"/>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className={styles.total}>
        <p className="text text_type_main-default text_color_inactive">
          {time}
        </p>
        <div className={styles.total__price}>
          <p className="text text_type_digits-default mr-1">
            {orderPrice}
          </p>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </article>
  )
}