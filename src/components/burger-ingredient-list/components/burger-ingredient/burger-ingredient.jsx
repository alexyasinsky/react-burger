import styles from './burger-ingredient.module.scss';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";


export default function BurgerIngredient({ingredient}) {
  return (
      <figure className={`${styles.card} mb-8`}>
        {ingredient.quantity && <Counter count={ingredient.quantity} size="default"/>}
        <img className='ml-4 mr-4 mb-4' src={ingredient.image} alt={ingredient.name}/>
        <div className={styles.price}>
          <p className="text text_type_digits-default mb-4">{ingredient.price}</p><CurrencyIcon type="primary" />
        </div>
        <figcaption className="text text_type_main-default">{ingredient.name}</figcaption>
      </figure>
  )
}