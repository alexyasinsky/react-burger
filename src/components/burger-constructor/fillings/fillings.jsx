import styles from "./fillings.module.scss";
import {useDrop} from "react-dnd";
import FillingItem from "../filling-item/filling-item";
import {addFilling, selectFilling} from "../../../services/store/burger-constructor/reducers";
import {useDispatch, useSelector} from "react-redux";


export default function Fillings() {

  const filling = useSelector(selectFilling);

  const dispatch = useDispatch();

  const [{isFillingHover}, dropFillingTarget] = useDrop({
    accept: 'filling',
    drop(ingredient) {
      onFillingDropHandler(ingredient);
    },
    collect: monitor => ({
      isFillingHover: monitor.isOver(),
    })
  });

  function onFillingDropHandler(ingredient) {
    dispatch(addFilling(ingredient));
  }

  const fillingExtraClass = isFillingHover ? styles.ingredient_hovered : styles.ingredient;

  return (
    <>
      {filling.length === 0 ?
        (
          <div className={`${styles.empty} ${fillingExtraClass} ml-8 mt-2 mb-2`} ref={dropFillingTarget}>
            <p className="text text_type_main-default">Выберите начинку</p>
          </div>
        ) : (
          <div
            className={`${styles.filling} custom-scroll pr-2`}
            ref={dropFillingTarget}
          >
            {filling.map((item, index) => {
              return (
                <FillingItem ingredient={item} key={item.constructorId} index={index} extraClass={fillingExtraClass}/>
              );
            })}
          </div>
        )
      }
    </>


  )

}