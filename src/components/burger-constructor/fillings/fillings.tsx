import styles from "./fillings.module.scss";
import {useDrop} from "react-dnd";
import Filling from "../filling/filling";
import {addFilling, selectFillings} from "../../../services/store/burger-constructor/reducers";
import {JSX} from "react";
import {TIngredient} from "../../../utils/types";
// @ts-ignore
import {v4 as uuid} from "uuid";
import {useAppDispatch, useAppSelector} from "../../../services/store/hooks";


type TDropCollectedProps = {
  isFillingHover: boolean
}

export default function Fillings() : JSX.Element {

  const fillings: Array< TIngredient> = useAppSelector(selectFillings);

  const dispatch = useAppDispatch();

  const [{isFillingHover}, dropFillingTarget] = useDrop<TIngredient, unknown, TDropCollectedProps>({
    accept: 'filling',
    drop(ingredient: TIngredient) {
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
            {fillings.map((item:TIngredient, index) => {
              return (
                <Filling ingredient={item} key={uuid()} index={index} extraClass={fillingExtraClass}/>
              );
            })}
          </div>
        )
      }
    </>


  )

}