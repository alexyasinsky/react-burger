import styles from './burger-constructor.module.scss';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";


export default function BurgerConstructor({cart}) {

  const {bun, filling} = cart;
  const sum = bun.price * 2 + filling.reduce((acc, item) => acc + item.price, 0);

  return (
    <section className='pt-20'>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name}
          price={bun.price}
          thumbnail={bun.image}
          extraClass='mr-4 ml-8'
        />
      <div className={`${styles.filling} custom-scroll pr-2`}>
        {
          filling.map(((item, ind)=> {
            return (
              <div className={styles.filling__item} key={ind}>
                <DragIcon type="primary"/>
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </div>
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
          extraClass='mr-4 ml-8'
        />
      <div className={`${styles.total} mt-10 pr-4`}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">{sum}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" extraClass='ml-10'>
         Оформить заказ
        </Button>
      </div>
    </section>
  )
}