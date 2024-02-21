import styles from "./fillings.module.scss";
import {useDrop} from "react-dnd";
import Filling from "../filling/filling";
import {addFilling, selectFillings} from "../../../services/store/burger-constructor/reducers";
import {JSX} from "react";
import {TFillingIngredient} from "../../../utils/types";
import {useAppDispatch, useAppSelector} from "../../../services/store/hooks";


type TDropCollectedProps = {
  isFillingHover: boolean
}

export default function Fillings() : JSX.Element {

  const fillings: Array< TFillingIngredient> = useAppSelector(selectFillings);

  const dispatch = useAppDispatch();

  const [{isFillingHover}, dropFillingTarget] = useDrop<TFillingIngredient, unknown, TDropCollectedProps>({
    accept: 'filling',
    drop(ingredient: TFillingIngredient) {
      onFillingDropHandler(ingredient);
    },
    collect: monitor => ({
      isFillingHover: monitor.isOver(),
    })
  });

  function onFillingDropHandler(ingredient: TFillingIngredient) {
    dispatch(addFilling(ingredient));
  }

  const fillingExtraClass = isFillingHover ? styles.ingredient_hovered : styles.ingredient;

  return (
    <>
      {fillings.length === 0 ?
        (
          <div
            className={`${styles.empty} ${fillingExtraClass} ml-8 mt-2 mb-2`}
            ref={dropFillingTarget}
            data-test-drop='filling'
          >
            <p className="text text_type_main-default">Выберите начинку</p>
          </div>
        ) : (
          <div
            className={`${styles.filling} custom-scroll pr-2`}
            ref={dropFillingTarget}
            data-test-drop='filling'
          >
            {fillings.map((item:TFillingIngredient, index) => {
              return (
                <Filling ingredient={item} data-test-dropped-ingredient={item._id} key={item.constructorId} index={index} extraClass={fillingExtraClass}/>
              );
            })}
          </div>
        )
      }
    </>


  )

}