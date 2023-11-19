import styles from './burger-constructor.module.scss';
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";


export default function BurgerConstructor({bun, ingredients}) {

  return (
    <section className='pt-20'>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name}
          price={bun.price}
          thumbnail={bun.image}
          extraClass='mr-4'
        />
      <div className={`${styles.filling} custom-scroll pr-2`}>
        {
          ingredients.map(((item, ind)=> {
            return (
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                key={ind}
              />
            )
          }))
        }
      </div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bun.name}
          price={bun.price}
          thumbnail={bun.image}
          extraClass='mr-4'
        />
      <div className={`${styles.total} mt-10 pr-4`}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">123</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" extraClass='ml-10'>
         Оформить заказ
        </Button>
      </div>
    </section>
  )
}