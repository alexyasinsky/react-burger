import {JSX, useEffect, useMemo, useState} from "react";

import styles from './order-card.module.scss';
import {TIngredient, TOrder} from "../../utils/types";
import {useAppSelector} from "../../services/store/hooks";
import {selectIngredients} from "../../services/store/burger-ingredients/reducers";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import uuid from "../../utils/uuid";
import moment from "moment";
import 'moment/locale/ru';

type TProps = {
  order: TOrder;
  size: 'medium' | 'large'
}
export default function OrderCard({order, size}: TProps): JSX.Element {

  const ingredientsFromStore: Array<TIngredient> = useAppSelector(selectIngredients);

  const [orderIngredients, setOrderIngredients] = useState<Array<TIngredient>>([]);
  const [extraIngredientsCount, setExtraIngredientsCount] = useState<number>(0);
  const [orderPrice, setOrderPrice] = useState<number>(0);

  const translatedStatus = {
    created: 'Создан',
    cancelled: 'Отменен',
    pending: 'Готовится',
    done: 'Выполнен',
  }

  const id = useMemo(()=> {
    let orderStr = String(order.number);
    for (let i = orderStr.length; i < 6; i++) {
      orderStr = '0' + orderStr;
    }
    return `#${orderStr}`
    }, [order])

  const time = useMemo(()=> {
    return moment(order.updatedAt).locale('ru').calendar();
  }, [order])

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
    <article className={`${styles.card} ${styles[size]} mb-4`}>
      <div className={`${styles.box} mb-4`}>
        <p className="text text_type_digits-default">
          {id}
        </p>
        <p className="text text_type_main-default text_color_inactive">
          {time}
        </p>
      </div>
      <h3 className="text text_type_main-medium mb-1">
        {order.name}
      </h3>
      <p className={`${styles[order.status]} text text_type_main-small mb-4`}>
        {translatedStatus[order.status]}
      </p>
      <div className={styles.box}>
        <div className={styles.ingredients}>
          {orderIngredients.map((ingredient: TIngredient, ind)  => {
            const style = {
              backgroundImage: `url(${ingredient.image_mobile})`,
              transform: `translate(${-10*ind}px)`
            }
            return (
              <div key={uuid()} className={styles.image} style={style}/>
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
  )
}