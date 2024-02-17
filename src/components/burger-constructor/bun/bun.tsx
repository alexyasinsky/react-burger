import styles from './bun.module.scss';
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {selectBun} from "../../../services/store/burger-constructor/reducers";
import {forwardRef, JSX} from "react";
import {TIngredient} from "../../../utils/types";
import {useAppSelector} from "../../../services/store/hooks";


type TProps = {
  viewType: 'top' | 'bottom',
  isHover: boolean
}

const Bun = forwardRef<HTMLDivElement, TProps>(({viewType, isHover} : TProps, ref) : JSX.Element => {

  const bun: TIngredient | null = useAppSelector(selectBun);

  const hoverClass = isHover ? styles.ingredient_hovered : styles.ingredient;

  const borderClass = viewType === 'top' ? styles.empty_top : styles.empty_bottom;

  return (
    <>
      {bun === null ?
        (<div className={`${styles.empty} ${borderClass} ${hoverClass} ml-8 mr-4`} ref={ref}>
          <p className="text text_type_main-default">Выберите булку</p>
        </div>)
        :
        (<div
          ref={ref}
        >
          <ConstructorElement
            type={viewType}
            isLocked={true}
            text={`${bun['name']} (верх)`}
            price={Number(bun['price'])}
            thumbnail={bun['image']}
            extraClass={`${hoverClass} mr-4 ml-8`}
          />
        </div>)
      }
    </>
  )})

export default Bun;