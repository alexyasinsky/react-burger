import styles from "./fillings.module.scss";
import {useDrop} from "react-dnd";
import Filling from "../filling/filling";
import {addFilling, selectFillings} from "../../../services/store/burger-constructor/reducers";
import {useDispatch, useSelector} from "react-redux";
import {JSX} from "react";
import {TIngredient} from "../../../utils/types";


type TFillingIngredient = TIngredient & {
  constructorId: number;
}

type TDropCollectedProps = {
  isFillingHover: boolean
}

export default function Fillings() : JSX.Element {

  const fillings: Array<TFillingIngredient> = useSelector(selectFillings);

  const dispatch = useDispatch();

  const [{isFillingHover}, dropFillingTarget] = useDrop<TFillingIngredient, unknown, TDropCollectedProps>({
    accept: 'filling',
    drop(ingredient:TIngredient) {
      onFillingDropHandler(ingredient);
    },
    collect: monitor => ({
      isFillingHover: monitor.isOver(),
    })
  });

  function onFillingDropHandler(ingredient: TIngredient) {
    dispatch(addFilling(ingredient));
  }

  const fillingExtraClass = isFillingHover ? styles.ingredient_hovered : styles.ingredient;

  return (
    <>
      {fillings.length === 0 ?
        (
          <div className={`${styles.empty} ${fillingExtraClass} ml-8 mt-2 mb-2`} ref={dropFillingTarget}>
            <p className="text text_type_main-default">Выберите начинку</p>
          </div>
        ) : (
          <div
            className={`${styles.filling} custom-scroll pr-2`}
            ref={dropFillingTarget}
          >
            {fillings.map((item:TFillingIngredient, index) => {
              return (
                <Filling ingredient={item} key={item.constructorId} index={index} extraClass={fillingExtraClass}/>
              );
            })}
          </div>
        )
      }
    </>


  )

}