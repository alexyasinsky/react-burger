import styles from './burger-constructor.module.scss';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { v4 as uuid } from 'uuid';
import BurgerConstructorTotal from './burger-constructor-total/burger-constructor-total';
import {useDispatch, useSelector} from "react-redux";
import {setBun, addFilling, selectBun, selectFilling, removeFilling} from "../../services/store/burger-constructor/reducers";
import {useDrop} from "react-dnd";

export default function BurgerConstructor() {

  const bun = useSelector(selectBun);
  const filling = useSelector(selectFilling);

  const dispatch = useDispatch();

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

  const bunExtraClass = isTopBunHover || isBottomBunHover ? styles.ingredient_hovered : styles.ingredient;

  const fillingExtraClass = isFillingHover ? styles.ingredient_hovered : styles.ingredient;

  function deleteButtonHandler(e){
    const ind = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.ind;
    dispatch(removeFilling(ind));
  }

  return (
    <section className="pt-20">
      {bun === null ?
        (<div className={`${styles.empty} ${styles.empty_top} ${bunExtraClass} ml-8 mr-4`} ref={dropTopBunTarget}>
        <p className="text text_type_main-default">Выберите булку</p>
      </div>)
        :
        (<div
          ref={dropTopBunTarget}
        >
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
            extraClass={`${bunExtraClass} mr-4 ml-8`}
          />
        </div>)
      }
      {filling.length === 0 ?
        (
          <div className={`${styles.empty} ${fillingExtraClass} ml-8 mt-2 mb-2`} ref={dropFillingTarget} >
          <p className="text text_type_main-default">Выберите начинку</p>
      </div>
        ) : (
          <div
            className={`${styles.filling} custom-scroll pr-2`}
            ref={dropFillingTarget}
          >
                {filling.map((item, ind) => {
                    return (
                      <div
                        className={styles.filling__item}
                        key={uuid()}
                        data-ind={ind}
                      >
                        <DragIcon type="primary"/>
                        <ConstructorElement
                          text={item.name}
                          price={item.price}
                          thumbnail={item.image}
                          extraClass={fillingExtraClass}
                          handleClose={deleteButtonHandler}
                        />
                      </div>
                    );
                  })}
                </div>)
      }
      {bun === null ?
        (<div className={`${styles.empty} ${styles.empty_bottom} ${bunExtraClass} ml-8 mr-4`} ref={dropBottomBunTarget}>
        <p className="text text_type_main-default">Выберите булку</p>
      </div>)
        :
         ( <div
             ref={dropBottomBunTarget}
           >
             <ConstructorElement
               type="bottom"
               isLocked={true}
               text={`${bun.name} (низ)`}
               price={bun.price}
               thumbnail={bun.image}
               extraClass={`${bunExtraClass} mr-4 ml-8`}
             />
         </div>

        )
      }
      <BurgerConstructorTotal/>
    </section>
  )
}
