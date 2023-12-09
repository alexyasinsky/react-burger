import styles from './burger-constructor.module.scss';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import BurgerConstructorTotal from './burger-constructor-total/burger-constructor-total';
import {useDispatch, useSelector} from "react-redux";
import { makeOrder } from '../../services/store/order/actions';
import {setBun, addFilling, selectBun, selectFilling} from "../../services/store/burger-constructor/reducers";
import {useDrop} from "react-dnd";

export default function BurgerConstructor() {

  const bun = useSelector(selectBun);
  const filling = useSelector(selectFilling);

  const dispatch = useDispatch();
 //булку снизу и сверху массива ids
  const orderButtonHandler = useCallback(()=> {
    const ids = filling.map(item => item._id);
    dispatch(makeOrder(ids));
  }, [dispatch, filling])
  
  // const totalSum = useMemo(
  //   () => bun.price * 2 + filling.reduce((acc, item) => acc + item.price, 0),
  //   [bun, filling]
  // );

  const [{isTopBunHover}, dropTopBunTarget] = useDrop({
    accept: "bun",
    drop(ingredient) {
      onBunDropHandler(ingredient);
    },
    collect: monitor => ({
      isTopBunHover: monitor.isOver(),
    })
  });

  const [{isBottomBunHover}, dropBottomBunTarget] = useDrop({
    accept: "bun",
    drop(ingredient) {
      onBunDropHandler(ingredient);
    },
    collect: monitor => ({
      isBottomBunHover: monitor.isOver(),
    })
  });

  const [{isFillingHover}, dropFillingTarget] = useDrop({
    accept: 'filling',
    drop(ingredient) {
      onFillingDropHandler(ingredient);
    },
    collect: monitor => ({
      isFillingHover: monitor.isOver(),
    })
  });

  function onBunDropHandler(ingredient) {
    dispatch(setBun(ingredient));
  }

  function onFillingDropHandler(ingredient) {
    dispatch(addFilling(ingredient));
  }

  const bunBorderColor = {borderColor: isTopBunHover || isBottomBunHover ? 'var(--interface-accent, #4C4CFF)' : 'var(--interface-modal-bg, #1C1C21)'};

  const fillingBorderColor = {borderColor: isFillingHover ? 'var(--interface-accent, #4C4CFF)' : 'var(--interface-modal-bg, #1C1C21)'};

  return (
    <section className="pt-20">
      {bun === null ?
        (<div className={`${styles.empty} ${styles.empty_top} ${styles.ingredient} ml-8`} ref={dropTopBunTarget} style={bunBorderColor}>
        <p className="text text_type_main-default">Выберите булку</p>
      </div>)
        :
        (<div
          ref={dropTopBunTarget}
          style={bunBorderColor}
        >
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
            extraClass="mr-4 ml-8"
          />
        </div>)
      }
      {filling.length === 0 ?
        (
          <div className={`${styles.empty} ${styles.ingredient} ml-8 mt-3 mb-3`} ref={dropFillingTarget} style={fillingBorderColor} >
          <p className="text text_type_main-default">Выберите начинку</p>
      </div>
        ) : (
          <div
            className={`${styles.filling}custom-scroll pr-2`}
            ref={dropFillingTarget}
            style={fillingBorderColor}
          >
                {filling.map((item) => {
                    return (
                      <div className={styles.filling__item} key={uuid()}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                          text={item.name}
                          price={item.price}
                          thumbnail={item.image}
                        />
                      </div>
                    );
                  })}
                </div>)
      }
      {bun === null ?
        (<div className={`${styles.empty} ${styles.empty_bottom} ${styles.ingredient} ml-8`} ref={dropBottomBunTarget} style={bunBorderColor}>
        <p className="text text_type_main-default">Выберите булку</p>
      </div>)
        :
         ( <div
             ref={dropBottomBunTarget}
             style={bunBorderColor}
           >
             <ConstructorElement
               type="bottom"
               isLocked={true}
               text={`${bun.name} (низ)`}
               price={bun.price}
               thumbnail={bun.image}
               extraClass="mr-4 ml-8"
             />
         </div>

        )
      }
      {/*<BurgerConstructorTotal sum={totalSum} orderButtonHandler={orderButtonHandler}/>*/}
    </section>
  )

  // return (
  //   <section className="pt-20">
  //     <ConstructorElement
  //       type="top"
  //       isLocked={true}
  //       text={`${bun.name} (верх)`}
  //       price={bun.price}
  //       thumbnail={bun.image}
  //       extraClass="mr-4 ml-8"
  //     />
  //     <div className={`${styles.filling} custom-scroll pr-2`}>
  //       {filling.map((item) => {
  //         return (
  //           <div className={styles.filling__item} key={uuid()}>
  //             <DragIcon type="primary" />
  //             <ConstructorElement
  //               text={item.name}
  //               price={item.price}
  //               thumbnail={item.image}
  //             />
  //           </div>
  //         );
  //       })}
  //     </div>
  //     <ConstructorElement
  //       type="bottom"
  //       isLocked={true}
  //       text={`${bun.name} (низ)`}
  //       price={bun.price}
  //       thumbnail={bun.image}
  //       extraClass="mr-4 ml-8"
  //     />
  //     <BurgerConstructorTotal sum={totalSum} orderButtonHandler={orderButtonHandler}/>
  //   </section>
  // );
}
