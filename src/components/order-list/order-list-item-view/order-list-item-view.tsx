
import styles from "./order-list-item-view.module.scss";
import {TIngredient, TOrder} from "../../../utils/types";
import uuid from "../../../utils/uuid";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {JSX, useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {useAppSelector} from "../../../services/store/hooks";
import {selectIngredients} from "../../../services/store/burger-ingredients/reducers";


type TProps = {
  order: TOrder;
  number: string;
  size?: 'medium' | 'large';
  translatedStatus: string;
  time: string;
}

export default function OrderListItemView({order, number, size='medium', translatedStatus, time}: TProps): JSX.Element {
  const location = useLocation();

  const ingredientsFromStore: Array<TIngredient> = useAppSelector(selectIngredients);

  const [orderIngredients, setOrderIngredients] = useState<Array<TIngredient>>([]);
  const [extraIngredientsCount, setExtraIngredientsCount] = useState<number>(0);
  const [orderPrice, setOrderPrice] = useState<number>(0);

  useEffect(() => {
    const ingredients: Array<TIngredient> = [];
    let count = 0;
    let price = 0;
    order.ingredients.forEach(ingredientId => {
      const ingredientForAdd = ingredientsFromStore.find(ingredient => ingredient._id === ingredientId)!;
      price += +ingredientForAdd.price;
      if (ingredients.length <= 5) {
        ingredients.push(ingredientForAdd);
      } else {
        count += 1;
      }
    })
    setOrderIngredients([...ingredients]);
    setExtraIngredientsCount(count);
    setOrderPrice(price);
  }, [order, ingredientsFromStore]);


  return (
    <Link
      to={`${location.pathname}/${order.number}`}
      state={{background: location}}
      className={styles.link}
    >
      <article className={`${styles.wrapper} ${styles[size]} mb-4`}>
        <div className={`${styles.box} mb-4`}>
          <p className="text text_type_digits-default">
            {number}
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {time}
          </p>
        </div>
        <h3 className="text text_type_main-medium mb-1">
          {order.name}
        </h3>
        <p className={`${styles[order.status]} text text_type_main-small mb-4`}>
          {translatedStatus}
        </p>
        <div className={styles.box}>
          <div className={styles.ingredients}>
            {orderIngredients.map((ingredient: TIngredient, ind: number) => {
              const style = {
                backgroundImage: `url(${ingredient.image_mobile})`,
                transform: `translate(${-10 * ind}px)`
              }
              return (
                <div key={ind} className={styles.image} style={style}/>
              )
            })
            }
            {extraIngredientsCount !== 0 && (
              <div className={styles.extra} style={{transform: `translate(${-10 * orderIngredients.length - 54}px)`}}>
                <p className="text text_type_main-small">
                  +{extraIngredientsCount}
                </p>
              </div>
            )}
          </div>
          <div className={styles.price}>
            <p className="text text_type_digits-default mr-1">
              {orderPrice}
            </p>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </article>
    </Link>
  )
}